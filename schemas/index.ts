import { schemaType } from './troubleshootingGuide'
import { categorySchema } from './category'
import { sectionTypes } from './sections'

export const schemaTypes = [
  schemaType,
  categorySchema,
  ...sectionTypes,
]
