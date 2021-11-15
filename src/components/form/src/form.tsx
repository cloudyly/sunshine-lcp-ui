import { defineComponent, PropType, reactive } from 'vue'
import { Schema, UiSchema } from '@/components/types/common-types'
import { renderFormItem } from '@/components/form/src/form-utils'

const NAME = 'SsForm'

export default defineComponent({
  name: NAME,
  props: {
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
  } as const,
  setup (props, context) {
    console.log(props, context)
    // const formRef = ref()
    const form = reactive(props.model)

    const defaultSpan = 24 / props.column

    const renderForm = () => {
      const properties = props.schema.properties
      const formItems: JSX.Element[] = []
      Object.keys(properties).forEach((prop: string) => {
        const item = properties[prop]
        const uiItem = props.uiSchema[prop]
        const formItem = renderFormItem(form, prop, item, uiItem, defaultSpan)
        if (formItem) {
          formItems.push(formItem)
        }
      })
      return formItems
    }

    return () => (
      <div class={NAME}>
        <el-form ref="formRef" model={form} labelWidth="auto" size="mini">
          <el-row gutter={5}>
            {renderForm()}
          </el-row>
        </el-form>
      </div>
    )
  }
})
