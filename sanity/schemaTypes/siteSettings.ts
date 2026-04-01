import { defineType, defineField } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Site Settings",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "acceptingOrders",
      title: "Accepting Orders",
      type: "boolean",
      description: "Turn off to disable all order buttons and show a 'Currently unavailable' message to customers.",
      initialValue: true,
    }),
    defineField({
      name: "unavailableMessage",
      title: "Unavailable Message",
      type: "string",
      description: "Message shown to customers when orders are disabled.",
      initialValue: "We're currently not accepting new orders. Please check back soon!",
    }),
  ],
});
