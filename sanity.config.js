import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  projectId: 'b0jjhurd',
  dataset: 'troubleshooting',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Troubleshooting Section
            S.listItem()
              .title('Troubleshooting')
              .icon(() => '🔧')
              .child(
                S.list()
                  .title('Troubleshooting')
                  .items([
                    S.documentTypeListItem('troubleshootingGuide').title('Troubleshooting Guides'),
                    S.documentTypeListItem('category').title('Categories'),
                  ])
              ),
            // Downloads Section
            S.listItem()
              .title('Downloads')
              .icon(() => '📄')
              .child(
                S.list()
                  .title('Downloads')
                  .items([
                    S.documentTypeListItem('downloadablePdf').title('Downloadable PDFs'),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
