import {
  PropItem,
  PropItemTypes,
  UI_COLUMN,
  UI_DISABLED,
  UI_HIDDEN,
  UI_OPTIONS,
  UI_WIDGET,
  UiSchemaItem,
  UiWidgets
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
  const { type, oneOf, anyOf, format } = item
  const commonProps = uiItem[UI_OPTIONS] || {}
  commonProps.disabled = (uiItem[UI_DISABLED] === true)
  const generateItem = () => {
    switch (type) {
      case PropItemTypes.STRING: {
        if (!oneOf && !format) {
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
          const uiWidget = uiItem[UI_WIDGET] || 'select'
          if (uiWidget === UiWidgets.SELECT) {
            return (
              <el-select v-model={form[prop]} {...commonProps}>
                {
                  oneOf.map(one => (
                    <el-option label={one.title} value={one.const}/>
                  ))
                }
              </el-select>
            )
          } else if (uiWidget === UiWidgets.RADIO) {
            return (
              <el-radio-group v-model={form[prop]} {...commonProps}>
                {
                  oneOf.map(one => (
                    <el-radio label={one.const}>{one.title}</el-radio>
                  ))
                }
              </el-radio-group>
            )
          } else {
            throw Error('oneOf 只能使用 radio 或 select')
          }
        }
        break
      }
      case PropItemTypes.NUMBER: {
        return (
          <el-input-number
            v-model={form[prop]}
            {...commonProps}
          />
        )
        break
      }
      case PropItemTypes.BOOLEAN: {
        const uiWidget = uiItem[UI_WIDGET] || 'switch'
        const booleanOneOf = [
          { const: true, title: '是' },
          { const: false, title: '否' }
        ]
        if (uiWidget === UiWidgets.SWITCH) {
          return (
            <el-switch v-model={form[prop]} {...commonProps} />
          )
        } else if (uiWidget === UiWidgets.RADIO) {
          return (
            <el-radio-group v-model={form[prop]} {...commonProps}>
              { booleanOneOf.map(one => (
                <el-radio label={one.const}>{one.title}</el-radio>
              ))}
            </el-radio-group>
          )
        } else if (uiWidget === UiWidgets.SELECT) {
          return (
            <el-select v-model={form[prop]} {...commonProps}>
              {
                booleanOneOf.map(one => (
                  <el-option label={one.title} value={one.const}/>
                ))
              }
            </el-select>
          )
        } else {
          throw Error('boolean 只支持widget：switch, radio, select')
        }
        break
      }
      case PropItemTypes.ARRAY: {
        if (anyOf && anyOf.length > 0) {
          const uiWidget = uiItem[UI_WIDGET] || 'select'
          if (uiWidget === UiWidgets.SELECT) {
            return (
              <el-select v-model={form[prop]} multiple {...commonProps}>
                {
                  anyOf.map(item => (
                    <el-option label={item.title} value={item.const}/>
                  ))
                }
              </el-select>
            )
          } else if (uiWidget === UiWidgets.CHECKBOX) {
            return (
              <el-checkbox-group v-model={form[prop]}>
                {
                  anyOf.map(item => (
                    <el-checkbox label={item.const}>{item.title}</el-checkbox>
                  ))
                }
              </el-checkbox-group>
            )
          } else {
            throw Error('anyOf 只支持 select 和 checkbox')
          }
        }
        break
      }
      default:
        return <div>暂不支持类型 {type}</div>
    }
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
