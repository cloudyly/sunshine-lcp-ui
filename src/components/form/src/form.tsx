import { defineComponent, PropType, reactive } from 'vue'
import { PropItem, Schema, UI_HIDDEN, UiSchema, UiSchemaItem } from '@/components/types/common-types'

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

    const renderFormItem = (prop: string, item: PropItem, uiItem: UiSchemaItem = {}) => {
      return !uiItem[UI_HIDDEN] ? (
        <el-form-item label={item.title}>
          <el-input v-model={form[prop]}></el-input>
        </el-form-item>
      ) : null
    }

    const renderForm = () => {
      const properties = props.schema.properties
      const formItems: JSX.Element[] = []
      Object.keys(properties).forEach((prop: string) => {
        const item = properties[prop]
        const uiItem = props.uiSchema[prop]
        const formItem = renderFormItem(prop, item, uiItem)
        if (formItem) {
          formItems.push(formItem)
        }
      })
      return formItems
    }

    return () => (
      <div class={NAME}>
        <el-form ref="formRef" model={form} labelWidth="auto">
          {renderForm()}
        </el-form>
      </div>
    )
  }
})
