import { defineField, defineType } from "sanity";

export const newsletterIssue = defineType({
  name: "newsletterIssue",
  title: "Newsletter Issue",
  type: "document",
  fields: [
    defineField({
      name: "issueNumber",
      title: "Issue Number",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subject",
      title: "Subject Line",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "subject", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "previewText",
      title: "Preview Text",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contentJson",
      title: "Content JSON",
      type: "text",
      description: "Stringified NewsletterContent object for web rendering",
    }),
    defineField({
      name: "emailHtml",
      title: "Email HTML",
      type: "text",
      description: "Raw email HTML for reference",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Issue Number (Newest)",
      name: "issueDesc",
      by: [{ field: "issueNumber", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "subject", subtitle: "publishedAt" },
  },
});
