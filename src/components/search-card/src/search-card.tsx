import { computed, defineComponent, PropType, ref } from 'vue'
import { commonFormProps } from '@/components/types/common-props'
import { PropItem, UI_COLUMN } from '@/components/types/common-types'
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons'

const NAME = 'SsSearchCard'

const OPT_KEY = 'opt'

export default defineComponent({
  name: NAME,
  props: {
    ...commonFormProps,
    simpleSearchField: {
      type: Array as PropType<string[]>,
      required: false,
      default: null
    }
  },
  setup (props) {
    const isSimpleSearch = ref(true)

    const innerSimpleSearchField = computed<string[]>(() => {
      const { schema, simpleSearchField, column } = props
      if (simpleSearchField && simpleSearchField.length > 0) {
        return simpleSearchField
      }
      return Object.keys(schema.properties).slice(0, column - 1)
    })

    const innerSchema = computed(() => {
      const { schema } = props
      const opt = {
        type: 'string'
      }
      if (!isSimpleSearch.value) {
        const newSchema = { ...schema }
        newSchema.properties[OPT_KEY] = opt
        return newSchema
      }
      const newProperties: {[key: string]: PropItem} = {}
      innerSimpleSearchField.value.forEach(item => {
        newProperties[item] = schema.properties[item]
      })
      newProperties[OPT_KEY] = opt
      const newSchema = {
        ...schema,
        properties: newProperties
      }
      return newSchema
    })

    const calcOptColumn = () => {
      let totalColumn = 0
      Object.keys(innerSchema.value.properties).forEach(key => {
        if (key !== OPT_KEY) {
          const uiProperties = (props.uiSchema || {})[key]
          if (uiProperties && uiProperties[UI_COLUMN]) {
            totalColumn += (uiProperties[UI_COLUMN] || 1)
          } else {
            totalColumn += 1
          }
        }
      })
      console.log('计算opt的 ui:column', totalColumn, (props.column - totalColumn % props.column))
      return props.column - totalColumn % props.column
    }

    const innerUiSchema = computed(() => {
      const { uiSchema = {} } = props
      return {
        ...uiSchema,
        [OPT_KEY]: {
          'ui:column': calcOptColumn(),
          'ui:options': {
            labelWidth: 1
          }
        }
      }
    })

    const optSlot = () => {
      return (
        <div class={`${NAME}__opt`}>
          <el-button type='text' size='mini' onClick={() => { isSimpleSearch.value = !isSimpleSearch.value }}>
            { isSimpleSearch.value ? (
              <span>更多 <el-icon><ArrowDownBold /></el-icon></span>
            ) : (
              <span>折叠 <el-icon><ArrowUpBold /></el-icon></span>
            ) }
          </el-button>
          <el-button type='default' size='mini'>重置</el-button>
          <el-button type='primary' size='mini'>搜索</el-button>
        </div>
      )
    }
    return () => (
      <div class={NAME}>
        <ss-card shadow="hover">
          <ss-form
            schema={innerSchema.value}
            uiSchema={innerUiSchema.value}
            model={props.model}
          >
            {{ opt: optSlot }}
          </ss-form>
        </ss-card>
      </div>
    )
  }
})
