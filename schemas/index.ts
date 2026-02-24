import { schemaType } from './troubleshootingGuide'
import { categorySchema } from './category'
import downloadablePdfSchema from './downloads/downloadablePdf'
import appGuideSchema from './appGuides'

export const schemaTypes = [
  schemaType,
  categorySchema,
  downloadablePdfSchema,
  appGuideSchema,
]
