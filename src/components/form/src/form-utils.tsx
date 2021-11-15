import {
  PropItem,
  PropItemTypes, UI_COLUMN,
  UI_DISABLED,
  UI_HIDDEN,
  UI_OPTIONS,
  UiSchemaItem
} from '@/components/types/common-types'

export const renderFormItem = (
  form: { [key: string]: any },
  prop: string,
  item: PropItem,
  uiItem: UiSchemaItem = {},
  defaultSpan: number
): JSX.Element | null => {
  if (uiItem[UI_HIDDEN]) {
    return null
  }
  const { type, anyOf, oneOf, format } = item
  const commonProps = uiItem[UI_OPTIONS] || {}
  commonProps.disabled = (uiItem[UI_DISABLED] === true)
  const generateItem = () => {
    if (type === PropItemTypes.STRING) {
      if (!anyOf && !oneOf && !format) {
        return (
          <el-input
            v-model={form[prop]}
            {...commonProps}
          />
        )
      }
      if (format === 'date') {
        return (
          <el-date-picker
            v-model={form[prop]}
            type="date"
            {...commonProps}
          />
        )
      }
      // if (format === 'time') {
      //   return (
      //     <el-time-picker
      //       v-model={form[prop]}
      //       {...commonProps}
      //     />
      //   )
      // }
      if (oneOf && oneOf.length > 0) {
        return (
          <el-select v-model={form[prop]} {...commonProps}>
            {
              oneOf.map(one => (
                <el-option label={one.title} value={one.const}/>
              ))
            }
          </el-select>
        )
      }
      return <div>Other String</div>
    }
    return <div>Other Type</div>
  }
  const uiColumn = uiItem[UI_COLUMN] || 1
  return (
    <el-col span={defaultSpan * uiColumn}>
      <el-form-item label={item.title} prop={prop}>
        { generateItem() }
      </el-form-item>
    </el-col>
  )
}
