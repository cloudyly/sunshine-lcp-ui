import { PropType } from 'vue'
import { Schema, UiSchema } from '../types/common-types'

export const commonFormProps = {
  schema: {
    type: Object as PropType<Schema>,
    required: true
  },
  uiSchema: {
    type: Object as PropType<UiSchema>,
    required: false,
    default: () => ({})
  },
  model: {
    type: Object as PropType<{ [key: string]: any }>,
    required: true
  },
  column: {
    type: Number,
    require: false,
    default: 3
  }
} as const
