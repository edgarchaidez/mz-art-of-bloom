import { defineType, defineField } from "sanity";

export const arrangementSchema = defineType({
  name: "arrangement",
  title: "Arrangement",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price ($)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "material",
      title: "Material",
      type: "string",
      options: {
        list: [
          { title: "Artificial", value: "artificial" },
          { title: "Natural", value: "natural" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "occasion",
      title: "Occasions",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Anniversary",
          "Birthday",
          "Celebration",
          "Gift",
          "Romance",
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "hasBanner",
      title: "Has custom banner",
      type: "boolean",
      description: "Enable if customer can add a custom banner/phrase",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "images.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `$${subtitle}` : "",
        media,
      };
    },
  },
});
