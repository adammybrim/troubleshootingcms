import { defineType, defineField } from 'sanity'

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for this video section',
    }),
    defineField({
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Custom URL', value: 'custom' },
        ],
      },
      initialValue: 'youtube',
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description: 'YouTube video ID (e.g., dQw4w9WgXcQ) or Vimeo video ID',
      hidden: ({ parent }) => parent?.videoType === 'custom',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Full video URL for custom embeds',
      hidden: ({ parent }) => parent?.videoType !== 'custom',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Optional caption for the video',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Standard)', value: '16:9' },
          { title: '4:3 (Classic)', value: '4:3' },
          { title: '1:1 (Square)', value: '1:1' },
        ],
      },
      initialValue: '16:9',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      videoType: 'videoType',
      videoId: 'videoId',
    },
    prepare({ title, videoType, videoId }) {
      return {
        title: title || 'Video Embed',
        subtitle: `${videoType === 'youtube' ? 'YouTube' : videoType === 'vimeo' ? 'Vimeo' : 'Custom'}: ${videoId || 'No ID'}`,
      }
    },
  },
})
