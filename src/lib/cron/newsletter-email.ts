import type { NewsletterContent } from "./newsletter-ai";
import { markdownToEmailHtml } from "@/lib/markdown";

export function buildNewsletterHtml(
  content: NewsletterContent,
  siteUrl: string,
  weekLabel: string,
  archiveSlug?: string
): string {
  const introHtml = markdownToEmailHtml(
    content.personalIntro,
    "margin: 0 0 16px 0; line-height: 1.7; color: #374151; font-size: 16px;"
  );

  const mainBodyHtml = markdownToEmailHtml(
    content.mainSection.body,
    "margin: 0 0 16px 0; line-height: 1.7; color: #374151; font-size: 15px;"
  );

  const secondaryBodyHtml = markdownToEmailHtml(
    content.secondarySection.body,
    "margin: 0 0 14px 0; line-height: 1.7; color: #374151; font-size: 15px;"
  );

  const partnerBodyHtml = markdownToEmailHtml(
    content.featuredPartner.body,
    "margin: 0 0 12px 0; line-height: 1.6; color: #374151; font-size: 14px;"
  );

  const blogHtml = content.blogHighlights
    .map(
      (post) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
            <a href="${siteUrl}/blog/${post.slug}" style="color: #1B4D3E; font-weight: 600; text-decoration: none; font-size: 15px;">${post.title}</a>
            <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">${post.oneLiner}</p>
          </td>
        </tr>`
    )
    .join("");

  const mainLabel =
    content.mainSection.type === "trends" ? "Market Update" : "Investor Education";
  const secondaryLabel =
    content.secondarySection.type === "trends" ? "Market Note" : "Quick Lesson";

  const archiveLink = archiveSlug
    ? `<a href="${siteUrl}/newsletter/${archiveSlug}" style="color: #6b7280; text-decoration: underline; font-size: 12px;">Read this on the web</a>`
    : "";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <title>${content.subject}</title>
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; padding: 12px !important; }
      .content { padding: 20px !important; }
      .header { padding: 24px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    ${content.previewText}
    ${"&zwnj;&nbsp;".repeat(20)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 24px 16px;">

        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td class="header" style="background: linear-gradient(135deg, #1B4D3E 0%, #2d7d5f 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">ProInvestorHub</h1>
              <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Weekly investing insights from Bill Rice</p>
            </td>
          </tr>

          <!-- Personal Intro -->
          <tr>
            <td class="content" style="padding: 32px 32px 24px;">
              ${introHtml}
            </td>
          </tr>

          <!-- Main Section -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px; overflow: hidden; border: 1px solid ${content.mainSection.type === "trends" ? "#fde68a" : "#b8e0cf"};">
                <tr>
                  <td style="background-color: ${content.mainSection.type === "trends" ? "#D4A843" : "#1B4D3E"}; padding: 12px 20px;">
                    <p style="margin: 0; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">${mainLabel}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: ${content.mainSection.type === "trends" ? "#fffbeb" : "#f0faf5"};">
                    <h2 style="margin: 0 0 16px 0; font-size: 20px; color: #111827; line-height: 1.3;">${content.mainSection.title}</h2>
                    ${mainBodyHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Secondary Section -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left: 4px solid ${content.secondarySection.type === "trends" ? "#D4A843" : "#1B4D3E"};">
                <tr>
                  <td style="padding: 16px 20px; background-color: ${content.secondarySection.type === "trends" ? "#fdf8ed" : "#f0faf5"}; border-radius: 0 8px 8px 0;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: ${content.secondarySection.type === "trends" ? "#92400e" : "#1B4D3E"};">${secondaryLabel}</p>
                    <h3 style="margin: 0 0 12px 0; font-weight: 700; color: #111827; font-size: 17px;">${content.secondarySection.title}</h3>
                    ${secondaryBodyHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Featured Partner -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 10px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #6b7280;">Lending Partner Spotlight</p>
                    <h3 style="margin: 0 0 12px 0; font-size: 17px; color: #111827;">
                      <a href="${siteUrl}/lenders/reviews/${content.featuredPartner.lenderSlug}" style="color: #1B4D3E; text-decoration: none;">${content.featuredPartner.lenderName}</a>
                    </h3>
                    ${partnerBodyHtml}
                    <a href="${siteUrl}/lenders/reviews/${content.featuredPartner.lenderSlug}" style="display: inline-block; background-color: #1B4D3E; color: #ffffff; padding: 8px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px;">Read Full Review &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            content.blogHighlights.length > 0
              ? `
          <!-- Blog Highlights -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #111827;">Worth Reading This Week</h3>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${blogHtml}
              </table>
            </td>
          </tr>`
              : ""
          }

          <!-- CTA -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1B4D3E 0%, #2d7d5f 100%); border-radius: 10px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 14px 0; color: rgba(255,255,255,0.9); font-size: 15px;">Run the numbers on your next deal</p>
                    <a href="${content.ctaUrl}" style="display: inline-block; background-color: #D4A843; color: #1B4D3E; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px;">${content.ctaText}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <p style="margin: 0 0 6px 0; color: #374151; font-size: 15px; line-height: 1.6;">${content.closingNote}</p>
              <p style="margin: 0; color: #111827; font-weight: 600; font-size: 15px;">&mdash; Bill Rice</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">
                      <a href="${siteUrl}" style="color: #1B4D3E; text-decoration: none; font-weight: 600;">ProInvestorHub</a> &nbsp;|&nbsp;
                      <a href="${siteUrl}/blog" style="color: #6b7280; text-decoration: none;">Blog</a> &nbsp;|&nbsp;
                      <a href="${siteUrl}/calculators" style="color: #6b7280; text-decoration: none;">Calculators</a> &nbsp;|&nbsp;
                      <a href="${siteUrl}/lenders" style="color: #6b7280; text-decoration: none;">Lenders</a> &nbsp;|&nbsp;
                      <a href="${siteUrl}/newsletter" style="color: #6b7280; text-decoration: none;">Archive</a>
                    </p>
                    <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px;">
                      You're receiving this because you signed up at proinvestorhub.com.
                    </p>
                    <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px;">
                      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
                    </p>
                    ${archiveLink ? `<p style="margin: 8px 0 0 0;">${archiveLink}</p>` : ""}
                    <p style="margin: 8px 0 0 0; color: #d1d5db; font-size: 11px;">Week of ${weekLabel}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}
