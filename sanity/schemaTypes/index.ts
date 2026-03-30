import { type SchemaTypeDefinition } from 'sanity'
import { arrangementSchema } from './arrangement'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [arrangementSchema],
}
