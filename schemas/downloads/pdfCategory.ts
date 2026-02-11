import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pdfCategory',
  title: 'PDF Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or emoji for this category',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Red', value: 'red' },
          { title: 'Purple', value: 'purple' },
          { title: 'Orange', value: 'orange' },
          { title: 'Gray', value: 'gray' },
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order for categories',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
      color: 'color',
    },
    prepare(selection: any) {
      const { title, icon, color } = selection
      return {
        title: title || 'Untitled Category',
        subtitle: icon || 'No icon',
        media: icon || '📄',
      }
    },
  },
  orderings: [
    {
      title: 'Order (Custom)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
