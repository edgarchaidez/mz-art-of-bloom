import { type SchemaTypeDefinition } from 'sanity'
import { arrangementSchema } from './arrangement'
import { siteSettingsSchema } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [arrangementSchema, siteSettingsSchema],
}
