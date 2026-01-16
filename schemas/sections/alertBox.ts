import { defineType, defineField } from 'sanity'

export const alertBox = defineType({
  name: 'alertBox',
  title: 'Alert Box',
  type: 'object',
  fields: [
    defineField({
      name: 'alertType',
      title: 'Alert Type',
      type: 'string',
      options: {
        list: [
          { title: '🔴 Error', value: 'error' },
          { title: '🟡 Warning', value: 'warning' },
          { title: '💡 Tip', value: 'tip' },
          { title: 'ℹ️ Info', value: 'info' },
          { title: '✅ Success', value: 'success' },
        ],
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'title',
      title: 'Alert Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Alert Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
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
    defineField({
      name: 'dismissible',
      title: 'Dismissible',
      type: 'boolean',
      description: 'Allow users to dismiss this alert',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      alertType: 'alertType',
      title: 'title',
      content: 'content',
    },
    prepare({ alertType, title, content }) {
      const icons = {
        error: '🔴',
        warning: '🟡',
        tip: '💡',
        info: 'ℹ️',
        success: '✅',
      }
      
      return {
        title: `${icons[alertType]} ${title}`,
        subtitle: content?.[0]?.children?.[0]?.text?.slice(0, 50) + '...' || 'No content',
      }
    },
  },
})
