import { schemaType } from './troubleshootingGuide'
import { categorySchema } from './category'
import downloadablePdfSchema from './downloads/downloadablePdf'

export const schemaTypes = [
  schemaType,
  categorySchema,
  downloadablePdfSchema,
]
