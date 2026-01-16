import { defineType, defineField } from 'sanity'

export const sideBySide = defineType({
  name: 'sideBySide',
  title: 'Side by Side',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for this section',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Image Left, Text Right', value: 'imageLeft' },
          { title: 'Text Left, Image Right', value: 'textLeft' },
        ],
      },
      initialValue: 'imageLeft',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'text',
      title: 'Text Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      image: 'image',
    },
    prepare({ title, layout, image }) {
      return {
        title: title || 'Side by Side',
        subtitle: `${layout === 'imageLeft' ? 'Image Left' : 'Text Left'}`,
        media: image,
      }
    },
  },
})
