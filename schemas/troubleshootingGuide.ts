import { defineType, defineField } from 'sanity'

export const schemaType = defineType({
  name: 'troubleshootingGuide',
  title: 'Troubleshooting Guide',
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
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Estimated Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
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
        {
          type: 'object',
          name: 'sideBySide',
          title: 'Side by Side',
          fields: [
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
              title: 'Text',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              layout: 'layout',
              image: 'image',
            },
            prepare({ layout, image }) {
              return {
                title: `${layout === 'imageLeft' ? 'Image Left' : 'Text Left'}`,
                media: image,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'doubleColumn',
          title: 'Double Column',
          fields: [
            defineField({
              name: 'col1Image',
              title: 'Column 1 Image',
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
              name: 'col1Title',
              title: 'Column 1 Title',
              type: 'string',
            }),
            defineField({
              name: 'col1Text',
              title: 'Column 1 Text',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'col2Image',
              title: 'Column 2 Image',
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
              name: 'col2Title',
              title: 'Column 2 Title',
              type: 'string',
            }),
            defineField({
              name: 'col2Text',
              title: 'Column 2 Text',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              col1Image: 'col1Image',
              col2Image: 'col2Image',
            },
            prepare({ col1Image, col2Image }) {
              return {
                title: 'Double Column',
                media: col1Image || col2Image,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
    },
  },
})
