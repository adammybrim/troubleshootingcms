import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'downloadablePdf',
  title: 'Downloadable PDF',
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
      name: 'currentVersion',
      title: 'Current Version',
      type: 'object',
      fields: [
        defineField({
          name: 'version',
          title: 'Version Number',
          type: 'string',
          description: 'e.g., 1.0.0, 2.1, v3',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'releaseDate',
          title: 'Release Date',
          type: 'datetime',
          initialValue: () => new Date().toISOString(),
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'pdfFile',
          title: 'PDF File',
          type: 'file',
          options: {
            accept: 'application/pdf',
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fileSize',
          title: 'File Size',
          type: 'string',
          description: 'Auto-calculated from uploaded file',
          readOnly: true,
        }),
        defineField({
          name: 'changeLog',
          title: 'Change Log',
          type: 'text',
          rows: 4,
          description: 'What changed in this version',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'versionHistory',
      title: 'Version History',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'version',
              title: 'Version Number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'releaseDate',
              title: 'Release Date',
              type: 'datetime',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'pdfFile',
              title: 'PDF File',
              type: 'file',
              options: {
                accept: 'application/pdf',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'fileSize',
              title: 'File Size',
              type: 'string',
              readOnly: true,
            }),
            defineField({
              name: 'changeLog',
              title: 'Change Log',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'isDeprecated',
              title: 'Deprecated',
              type: 'boolean',
              initialValue: false,
              description: 'Mark if this version is no longer recommended',
            }),
          ],
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
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      description: 'Track number of downloads',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show in featured downloads section',
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
      version: 'currentVersion.version',
      media: 'currentVersion.pdfFile.asset',
    },
    prepare({ title, version, media }) {
      return {
        title: `${title} v${version}`,
        subtitle: 'Downloadable PDF',
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
      title: 'Download Count (Most)',
      name: 'downloadCountDesc',
      by: [{ field: 'downloadCount', direction: 'desc' }],
    },
  ],
})
