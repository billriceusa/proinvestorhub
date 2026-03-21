import type { NewsletterContent } from "./newsletter-ai";

export function buildNewsletterHtml(
  content: NewsletterContent,
  siteUrl: string,
  weekLabel: string
): string {
  const introHtml = content.personalIntro
    .split("\n\n")
    .map((p) => `<p style="margin: 0 0 16px 0; line-height: 1.7;">${p}</p>`)
    .join("");

  const newsItemsHtml = content.newsUpdate.items
    .map(
      (item, i) => `
        <tr>
          <td style="padding: 14px 20px; ${i < content.newsUpdate.items.length - 1 ? "border-bottom: 1px solid #fde68a;" : ""}">
            <p style="margin: 0 0 4px 0; font-weight: 700; color: #92400e; font-size: 15px;">${item.title}</p>
            <p style="margin: 0; color: #78350f; line-height: 1.6; font-size: 14px;">${item.body}</p>
          </td>
        </tr>`
    )
    .join("");

  const tipsHtml = content.quickTips
    .map(
      (tip, i) => `
        <tr>
          <td style="padding: 16px 20px; ${i < content.quickTips.length - 1 ? "border-bottom: 1px solid #e5e7eb;" : ""}">
            <p style="margin: 0 0 6px 0; font-weight: 700; color: #1B4D3E; font-size: 15px;">${tip.title}</p>
            <p style="margin: 0; color: #374151; line-height: 1.6; font-size: 15px;">${tip.body}</p>
          </td>
        </tr>`
    )
    .join("");

  const educationBodyHtml = content.education.body
    .split("\n\n")
    .map((p) => `<p style="margin: 0 0 14px 0; color: #374151; line-height: 1.7; font-size: 15px;">${p}</p>`)
    .join("");

  const educationLinksHtml = [
    ...content.education.relatedGlossaryTerms.map(
      (t) => `<a href="${siteUrl}/glossary/${t.slug}" style="display: inline-block; background-color: #e0f2e9; color: #1B4D3E; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 13px; font-weight: 600; margin: 4px 4px 4px 0;">${t.term}</a>`
    ),
    ...content.education.relatedCalculators.map(
      (c) => `<a href="${siteUrl}${c.href}" style="display: inline-block; background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 13px; font-weight: 600; margin: 4px 4px 4px 0;">${c.name} calculator</a>`
    ),
  ].join("");

  const progressPercent = Math.round((content.education.weekNumber / content.education.totalWeeks) * 100);

  const digestHtml = content.weeklyDigest
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

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${content.subject}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; padding: 12px !important; }
      .content { padding: 20px !important; }
      .header { padding: 24px 20px !important; }
      .featured-img { height: 180px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">

  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    ${content.previewText}
    ${"&zwnj;&nbsp;".repeat(20)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 24px 16px;">

        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

          <tr>
            <td class="header" style="background: linear-gradient(135deg, #1B4D3E 0%, #2d7d5f 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">ProInvestorHub</h1>
              <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.85); font-size: 14px; font-weight: 400;">Weekly real estate investing insights — by Bill Rice</p>
            </td>
          </tr>

          <tr>
            <td class="content" style="padding: 32px;">
              ${introHtml}
            </td>
          </tr>

          <!-- News Update -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px; overflow: hidden; border: 1px solid #fde68a;">
                <tr>
                  <td style="background-color: #D4A843; padding: 14px 20px;">
                    <p style="margin: 0; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">${content.newsUpdate.headline}</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #fffbeb;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${newsItemsHtml}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Featured Article -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0faf5; border-radius: 10px; overflow: hidden; border: 1px solid #b8e0cf;">
                <tr>
                  <td style="background-color: #1B4D3E; padding: 14px 20px;">
                    <p style="margin: 0; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Featured This Week</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="margin: 0 0 10px 0; font-size: 20px; color: #111827; line-height: 1.3;">
                      <a href="${siteUrl}/blog/${content.featuredArticle.slug}" style="color: #111827; text-decoration: none;">${content.featuredArticle.title}</a>
                    </h2>
                    <p style="margin: 0 0 16px 0; color: #374151; font-size: 15px; line-height: 1.6;">${content.featuredArticle.spotlight}</p>
                    <a href="${siteUrl}/blog/${content.featuredArticle.slug}" style="display: inline-block; background-color: #1B4D3E; color: #ffffff; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Read the Full Article &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Tips -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <h2 style="margin: 0 0 4px 0; font-size: 18px; color: #111827;">Investor Tips From the Field</h2>
              <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 13px;">Exclusive insights — only in the newsletter</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 10px; border: 1px solid #e5e7eb;">
                ${tipsHtml}
              </table>
            </td>
          </tr>

          <!-- RE Investing 101 — Education Section -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px; overflow: hidden; border: 1px solid #b8e0cf;">
                <tr>
                  <td style="background: linear-gradient(135deg, #1B4D3E 0%, #2d7d5f 100%); padding: 14px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin: 0; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">RE Investing 101</p>
                          <p style="margin: 4px 0 0 0; color: rgba(255,255,255,0.8); font-size: 12px;">Phase ${content.education.weekNumber <= 4 ? 1 : content.education.weekNumber <= 8 ? 2 : content.education.weekNumber <= 12 ? 3 : content.education.weekNumber <= 16 ? 4 : content.education.weekNumber <= 20 ? 5 : 6}: ${content.education.phase} — Week ${content.education.weekNumber} of ${content.education.totalWeeks}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: #f0faf5;">
                    <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #111827; line-height: 1.3;">${content.education.topic}</h3>
                    ${educationBodyHtml}

                    <!-- Key Takeaway -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0;">
                      <tr>
                        <td style="background-color: #1B4D3E; border-radius: 8px; padding: 16px 20px;">
                          <p style="margin: 0 0 4px 0; color: #D4A843; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Key Takeaway</p>
                          <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6; font-weight: 500;">${content.education.keyTakeaway}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Practice Prompt -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0 0 0;">
                      <tr>
                        <td style="background-color: #e0f2e9; border-radius: 8px; padding: 14px 20px; border: 1px dashed #1B4D3E;">
                          <p style="margin: 0 0 4px 0; color: #1B4D3E; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Practice This Week</p>
                          <p style="margin: 0; color: #1B4D3E; font-size: 14px; line-height: 1.6;">${content.education.practicePrompt}</p>
                        </td>
                      </tr>
                    </table>

                    ${educationLinksHtml ? `
                    <!-- Related Resources -->
                    <div style="margin-top: 16px;">
                      <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Related Resources</p>
                      ${educationLinksHtml}
                    </div>` : ""}

                    <!-- Progress Bar -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px;">Your progress: Week ${content.education.weekNumber} of ${content.education.totalWeeks}</p>
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #d1d5db; border-radius: 4px; height: 8px;">
                            <tr>
                              <td style="width: ${progressPercent}%; background-color: #1B4D3E; border-radius: 4px; height: 8px; font-size: 1px;">&nbsp;</td>
                              <td style="font-size: 1px;">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Market Insight -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left: 4px solid #D4A843; padding-left: 0;">
                <tr>
                  <td style="padding: 16px 20px; background-color: #fdf8ed; border-radius: 0 8px 8px 0;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #92400e;">Market Insight</p>
                    <p style="margin: 0 0 6px 0; font-weight: 700; color: #111827; font-size: 16px;">${content.industryInsight.headline}</p>
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6;">${content.industryInsight.body}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            content.weeklyDigest.length > 0
              ? `
          <!-- Weekly Digest -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #111827;">This Week on the Blog</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${digestHtml}
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
                  <td style="padding: 28px 24px; text-align: center;">
                    <h2 style="margin: 0 0 8px 0; color: #ffffff; font-size: 20px; font-weight: 700;">Run the Numbers on Your Next Deal</h2>
                    <p style="margin: 0 0 18px 0; color: rgba(255,255,255,0.9); font-size: 15px;">Free calculators for cap rate, cash flow, ROI & more</p>
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
              <p style="margin: 0; color: #111827; font-weight: 600; font-size: 15px;">— Bill Rice</p>
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
                      <a href="${siteUrl}/start-here" style="color: #6b7280; text-decoration: none;">Start Here</a> &nbsp;|&nbsp;
                      <a href="${siteUrl}/blog" style="color: #6b7280; text-decoration: none;">Blog</a> &nbsp;|&nbsp;
                      <a href="${siteUrl}/guides" style="color: #6b7280; text-decoration: none;">Guides</a> &nbsp;|&nbsp;
                      <a href="${siteUrl}/glossary" style="color: #6b7280; text-decoration: none;">Glossary</a> &nbsp;|&nbsp;
                      <a href="${siteUrl}/calculators" style="color: #6b7280; text-decoration: none;">Calculators</a>
                    </p>
                    <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px;">
                      You're receiving this because you signed up at proinvestorhub.com.
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
                    </p>
                    <p style="margin: 12px 0 0 0; color: #d1d5db; font-size: 11px;">Week of ${weekLabel}</p>
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
