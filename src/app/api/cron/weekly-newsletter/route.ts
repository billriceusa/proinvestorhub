import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { Resend } from "resend";
import { NEWSLETTER_CALENDAR } from "@/data/newsletter-calendar";
import { getEducationCandidates } from "@/data/newsletter-education";
import { lenders } from "@/data/lenders";
import {
  generateNewsletterContent,
  type RecentPost,
  type NewsletterContent,
} from "@/lib/cron/newsletter-ai";
import { buildNewsletterHtml } from "@/lib/cron/newsletter-email";
import { publishNewsletterIssue } from "@/lib/cron/sanity-publish";
import { recordCronRun } from "@/lib/cron/heartbeat";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const REVIEW_EMAIL = "bill@billricestrategy.com";

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://proinvestorhub.com";
}

function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId || !token) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN"
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: "2026-03-14",
    token,
    useCdn: false,
  });
}

function getWeekDates(): {
  tuesday: string;
  tuesdayISO: string;
  weekLabel: string;
  weekNumber: number;
} {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilTuesday = dayOfWeek <= 2 ? 2 - dayOfWeek : 9 - dayOfWeek;

  const tuesday = new Date(now);
  tuesday.setDate(now.getDate() + daysUntilTuesday);
  tuesday.setHours(9, 0, 0, 0);

  const monday = new Date(tuesday);
  monday.setDate(tuesday.getDate() - 1);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((now.getTime() - startOfYear.getTime()) / 86400000 +
      startOfYear.getDay() +
      1) /
      7
  );

  return {
    tuesday: fmt(tuesday),
    tuesdayISO: tuesday.toISOString(),
    weekLabel: fmt(monday),
    weekNumber,
  };
}

async function fetchRecentPosts(): Promise<RecentPost[]> {
  try {
    const client = getSanityClient();
    const posts = await client.fetch<RecentPost[]>(
      `*[_type == "post"] | order(publishedAt desc)[0...10] {
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        "pillar": categories[0]->title
      }`
    );
    return posts;
  } catch (err) {
    console.warn("Failed to fetch posts from Sanity:", err);
    return [];
  }
}

function findCurrentPlan(weekLabel: string) {
  const exactMatch = NEWSLETTER_CALENDAR.find(
    (p) => p.sendDate === weekLabel
  );
  if (exactMatch) return exactMatch;

  const weekDate = new Date(weekLabel);
  return NEWSLETTER_CALENDAR.find((p) => {
    const planDate = new Date(p.sendDate);
    const diff = Math.abs(weekDate.getTime() - planDate.getTime());
    return diff < 7 * 24 * 60 * 60 * 1000;
  });
}

async function sendPreviewEmail(
  resend: Resend,
  fromEmail: string,
  subject: string,
  html: string
): Promise<{ success: boolean; error?: string }> {
  const previewHtml = `
    <div style="background: #fdf8ed; border: 2px solid #D4A843; border-radius: 8px; padding: 16px; margin: 0 auto 24px; max-width: 600px; font-family: -apple-system, sans-serif;">
      <p style="margin: 0 0 4px 0; font-weight: 700; color: #92400e;">Newsletter Preview for Review</p>
      <p style="margin: 0; color: #78350f; font-size: 14px;">This is the newsletter scheduled to send to subscribers on Tuesday. Review and reply with any changes needed.</p>
    </div>
    ${html}`;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: REVIEW_EMAIL,
    subject: `[PREVIEW] ${subject}`,
    html: previewHtml,
  });

  if (error) {
    return { success: false, error: JSON.stringify(error) };
  }
  return { success: true };
}

async function sendToContacts(
  resend: Resend,
  audienceId: string,
  fromEmail: string,
  subject: string,
  html: string,
  scheduledAt: string
): Promise<{ success: boolean; broadcastId?: string; error?: string }> {
  const { data: contactsData, error: contactsError } =
    await resend.contacts.list({ audienceId });

  if (contactsError || !contactsData) {
    return {
      success: false,
      error: `Failed to list contacts: ${JSON.stringify(contactsError)}`,
    };
  }

  const contacts = contactsData.data.filter((c) => !c.unsubscribed);
  console.log(`[Newsletter] Sending to ${contacts.length} active contacts`);

  if (contacts.length === 0) {
    return { success: true, broadcastId: "no-contacts" };
  }

  const results = await Promise.allSettled(
    contacts.map((contact) =>
      resend.emails.send({
        from: fromEmail,
        to: contact.email,
        subject,
        html,
        scheduledAt,
      })
    )
  );

  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected");

  if (failed.length > 0) {
    console.error(
      "[Newsletter] Some sends failed:",
      failed.map((r) => (r as PromiseRejectedResult).reason)
    );
  }

  return {
    success: failed.length === 0,
    broadcastId: `individual-${succeeded}-of-${contacts.length}`,
    ...(failed.length > 0 && {
      error: `${failed.length}/${contacts.length} sends failed`,
    }),
  };
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startTime = Date.now();
  const errors: string[] = [];
  const weekDates = getWeekDates();
  const siteUrl = getSiteUrl();

  console.log(
    `[Newsletter] Starting run for week of ${weekDates.weekLabel}, send date: ${weekDates.tuesday}`
  );

  // Fetch recent blog posts
  const recentPosts = await fetchRecentPosts();
  console.log(`[Newsletter] Found ${recentPosts.length} recent posts`);

  // Optional theme from calendar
  const plan = findCurrentPlan(weekDates.tuesday);
  if (plan) {
    console.log(`[Newsletter] Calendar plan: "${plan.theme}"`);
  }

  // Education candidates (3 options for AI to choose from)
  const educationCandidates = getEducationCandidates(weekDates.weekNumber, 3);
  console.log(
    `[Newsletter] Education candidates: ${educationCandidates.map((t) => `"${t.topic}"`).join(", ")}`
  );

  // Featured lender (rotation)
  const featuredLender = lenders[weekDates.weekNumber % lenders.length];
  console.log(`[Newsletter] Featured lender: ${featuredLender.name}`);

  // Generate content
  let content: NewsletterContent;
  try {
    console.log("[Newsletter] Generating newsletter content with AI...");
    content = await generateNewsletterContent(
      plan ?? null,
      recentPosts,
      siteUrl,
      weekDates.weekLabel,
      educationCandidates,
      featuredLender
    );
    console.log(
      `[Newsletter] Generated: "${content.subject}" (main: ${content.mainSection.type})`
    );
  } catch (err) {
    const msg = `Newsletter content generation failed: ${err instanceof Error ? err.message : err}`;
    console.error(msg);
    await recordCronRun({
      name: "weekly-newsletter",
      status: "failed",
      detail: msg,
      durationMs: Date.now() - startTime,
    });
    return NextResponse.json(
      { success: false, error: msg, duration: Date.now() - startTime },
      { status: 500 }
    );
  }

  // Build HTML email
  const archiveSlug = weekDates.weekLabel;
  const newsletterHtml = buildNewsletterHtml(
    content,
    siteUrl,
    weekDates.weekLabel,
    archiveSlug
  );
  console.log(
    `[Newsletter] Built HTML email (${(newsletterHtml.length / 1024).toFixed(1)} KB)`
  );

  // Publish to Sanity for web archive
  try {
    const { slug } = await publishNewsletterIssue(
      content,
      newsletterHtml,
      weekDates.weekLabel,
      weekDates.weekNumber
    );
    console.log(`[Newsletter] Published to Sanity: /newsletter/${slug}`);
  } catch (err) {
    const msg = `Sanity publish failed: ${err instanceof Error ? err.message : err}`;
    console.error(msg);
    errors.push(msg);
  }

  // Send preview + schedule delivery
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    "ProInvestorHub <noreply@proinvestorhub.com>";

  if (resendApiKey) {
    const resend = new Resend(resendApiKey);

    // Preview to Bill
    try {
      const preview = await sendPreviewEmail(
        resend,
        fromEmail,
        content.subject,
        newsletterHtml
      );
      if (preview.success) {
        console.log(`[Newsletter] Preview sent to ${REVIEW_EMAIL}`);
      } else {
        errors.push(`Preview email failed: ${preview.error}`);
      }
    } catch (err) {
      errors.push(
        `Preview email error: ${err instanceof Error ? err.message : err}`
      );
    }

    // Schedule delivery to subscribers
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        const scheduledAt = `${weekDates.tuesday}T14:00:00.000Z`;
        const result = await sendToContacts(
          resend,
          audienceId,
          fromEmail,
          content.subject,
          newsletterHtml,
          scheduledAt
        );
        if (result.success) {
          console.log(`[Newsletter] Scheduled: ${result.broadcastId}`);
        } else {
          errors.push(`Send failed: ${result.error}`);
        }
      } catch (err) {
        errors.push(
          `Send error: ${err instanceof Error ? err.message : err}`
        );
      }
    } else {
      errors.push("RESEND_AUDIENCE_ID not set");
    }

    // Send report email
    try {
      await resend.emails.send({
        from: fromEmail,
        to: REVIEW_EMAIL,
        subject: `Newsletter Report — ${weekDates.weekLabel}`,
        html: buildReportHtml(content, weekDates, errors),
      });
    } catch (err) {
      console.error("Report email failed:", err);
    }
  } else {
    errors.push("RESEND_API_KEY not set");
  }

  const duration = Date.now() - startTime;
  console.log(
    `[Newsletter] Completed in ${(duration / 1000).toFixed(1)}s — ${errors.length} errors`
  );

  await recordCronRun({
    name: "weekly-newsletter",
    status: errors.length === 0 ? "ok" : "partial",
    detail: errors.length > 0 ? errors.join("; ") : `subject="${content.subject}"`,
    durationMs: duration,
  });

  return NextResponse.json({
    success: errors.length === 0,
    duration,
    weekOf: weekDates.weekLabel,
    subject: content.subject,
    mainType: content.mainSection.type,
    featuredLender: content.featuredPartner.lenderName,
    previewSentTo: REVIEW_EMAIL,
    scheduledFor: weekDates.tuesday,
    errors,
  });
}

function buildReportHtml(
  content: NewsletterContent,
  weekDates: { tuesday: string; weekLabel: string },
  errors: string[]
): string {
  const errorsHtml =
    errors.length > 0
      ? `<div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-top: 20px;">
          <h3 style="color: #dc2626; margin: 0 0 8px;">Issues</h3>
          <ul style="margin: 0; padding-left: 20px;">${errors.map((e) => `<li>${e}</li>`).join("")}</ul>
        </div>`
      : "";

  const blogList = content.blogHighlights
    .map((b) => `<li>${b.title}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, sans-serif; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1B4D3E, #2d7d5f); color: white; padding: 24px; border-radius: 12px; margin-bottom: 20px;">
    <h1 style="margin: 0 0 4px; font-size: 22px;">Newsletter Report</h1>
    <p style="margin: 0; opacity: 0.9; font-size: 14px;">ProInvestorHub — Week of ${weekDates.weekLabel}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr><td style="padding: 8px 0; font-weight: 600; width: 140px;">Subject</td><td style="padding: 8px 0;">${content.subject}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600; border-top: 1px solid #e5e7eb;">Preview</td><td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">${content.previewText}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600; border-top: 1px solid #e5e7eb;">Main Section</td><td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">${content.mainSection.type}: ${content.mainSection.title}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600; border-top: 1px solid #e5e7eb;">Secondary</td><td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">${content.secondarySection.type}: ${content.secondarySection.title}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600; border-top: 1px solid #e5e7eb;">Partner</td><td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">${content.featuredPartner.lenderName}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600; border-top: 1px solid #e5e7eb;">Send Date</td><td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">${weekDates.tuesday} at 2 PM UTC</td></tr>
  </table>

  ${blogList ? `<h3 style="margin: 0 0 8px; font-size: 16px;">Blog Highlights</h3><ul style="margin: 0 0 20px; padding-left: 20px;">${blogList}</ul>` : ""}

  <p style="color: #6b7280; font-size: 13px;">A preview copy was sent separately. Reply to this email with any changes before Tuesday.</p>

  ${errorsHtml}

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0 12px;">
  <p style="color: #9ca3af; font-size: 11px;">Generated by ProInvestorHub newsletter cron at ${new Date().toISOString()}</p>
</body></html>`;
}
