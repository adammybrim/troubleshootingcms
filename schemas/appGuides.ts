import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'appGuide',
  title: 'App Guide',
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
      validation: (Rule) => Rule.required(),
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
            annotations: [
              {
                name: 'highlight',
                type: 'object',
                fields: [
                  {
                    name: 'color',
                    type: 'string',
                    title: 'Highlight Color',
                    options: {
                      list: [
                        { title: 'Yellow', value: 'yellow' },
                        { title: 'Brim', value: 'brim' },
                        { title: 'Red', value: 'red' },
                        { title: 'Blue', value: 'blue' },
                        { title: 'Purple', value: 'purple' },
                        { title: 'Orange', value: 'orange' },
                      ],
                    },
                    initialValue: 'yellow',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'object',
          name: 'inlineImage',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption below the image',
            },
          ],
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
                  { title: 'Image Left', value: 'imageLeft' },
                  { title: 'Text Left', value: 'textLeft' },
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
              name: 'textTitle',
              title: 'Text Title',
              type: 'string',
              description: 'Title for the text side only',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 5,
            }),
          ],
          preview: {
            select: {
              title: 'textTitle',
              layout: 'layout',
              media: 'image',
            },
            prepare({ title, layout, media }) {
              return {
                title: title || 'Side by Side',
                subtitle: `Layout: ${layout}`,
                media,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'imageWithText',
          title: 'Image with Text',
          fields: [
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
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Title above the image',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
              description: 'Small paragraph below the title',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              text: 'text',
              media: 'image',
            },
            prepare({ title, text, media }) {
              return {
                title: title || 'Image with Text',
                subtitle: text ? `${text.substring(0, 50)}${text.length > 50 ? '...' : ''}` : 'No text',
                media,
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
              col1Title: 'col1Title',
              col2Title: 'col2Title',
              col1Image: 'col1Image',
              col2Image: 'col2Image',
            },
            prepare({ col1Title, col2Title, col1Image, col2Image }) {
              return {
                title: `${col1Title || 'Column 1'} / ${col2Title || 'Column 2'}`,
                subtitle: 'Double Column',
                media: col1Image || col2Image,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show in featured guides section',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      app: 'app',
      media: 'content',
    },
    prepare({ title, app, media }) {
      return {
        title: title || 'Untitled App Guide',
        subtitle: app,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Last Updated (Newest)',
      name: 'lastUpdatedDesc',
      by: [{ field: 'lastUpdated', direction: 'desc' }],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'App (A-Z)',
      name: 'appAsc',
      by: [{ field: 'app', direction: 'asc' }],
    },
  ],
})
