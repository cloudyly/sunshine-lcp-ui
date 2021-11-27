import { computed, defineComponent, PropType, ref } from 'vue'
import { PropItem, Schema, UI_HIDDEN, UiSchema, UiSchemaItem } from '../../types/common-types'
import { renderColumnBySchema } from '../../table/src/table-utils'
import { ElDropdown, ElTableColumn } from 'element-plus'
import { TableColumn, TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { ArrowDown, Setting } from '@element-plus/icons'

const NAME = 'SsTable'

type CI<T> = { column: TableColumnCtx<T>; $index: number }
type RowButton = { key: symbol, label: string }

const EVENT_CURRENT_CHANGE = 'current-change'
const EVENT_SIZE_CHANGE = 'size-change'
const EVENT_CELL_CLICK = 'cell-click'
const EVENT_SELECTION_CHANGE = 'selection-change'
const EVENT_ROW_BUTTON_CLICK = 'row-buttons-click'
const EVENT_OPT_CREATE_CLICK = 'opt-create-click'
const EVENT_OPT_BATCH_DELETE_CLICK = 'opt-batch-delete-click'

type ColumnSetting = {
  prop: string;
  type?: string;
  title: string;
  hidden: boolean;
}

export default defineComponent({
  name: NAME,
  emits: [
    EVENT_CURRENT_CHANGE,
    EVENT_SIZE_CHANGE,
    EVENT_CELL_CLICK,
    EVENT_SELECTION_CHANGE,
    EVENT_ROW_BUTTON_CLICK,
    EVENT_OPT_CREATE_CLICK,
    EVENT_OPT_BATCH_DELETE_CLICK
  ],
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
    data: {
      type: Array,
      required: false,
      default: () => ([])
    },
    showIndex: {
      type: Boolean,
      required: false,
      default: false
    },
    indexMethod: {
      type: Function as PropType<(index: number) => number>,
      required: false,
      default: null
    },
    selectionType: {
      type: String,
      required: false,
      default: '',
      validator (value: string) {
        if (!value) {
          return true
        }
        return ['checkbox', 'radio'].includes(value)
      }
    },
    total: {
      type: Number,
      required: false,
      default: 0
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10
    },
    currentPage: {
      type: Number,
      required: false,
      default: 1
    },
    showPagination: {
      type: String,
      required: false,
      default: 'auto',
      validator (value: string) {
        if (!value) {
          return true
        }
        return ['auto', 'never', 'always'].includes(value)
      }
    },
    /* 是否是假分页（前端分页） */
    isPseudoPaging: {
      type: Boolean,
      required: false,
      default: false
    },
    rowButtons: {
      type: Function as PropType<(scope: CI<any>) => RowButton[]>,
      required: false,
      default: null
    },
    showColumnSetting: {
      type: Boolean,
      required: false,
      default: true
    },
    showOptCreate: {
      type: Boolean,
      required: false,
      default: true
    },
    showOptBatchDelete: {
      type: Boolean,
      required: false,
      default: true
    }
  } as const,
  setup (props, { attrs, emit, slots }) {
    const tableRef = ref()

    const columnSettings = ref<ColumnSetting[]>([])

    const buildColumnSettings = () => {
      const { schema, uiSchema, showIndex } = props
      if (showIndex) {
        columnSettings.value.push({ prop: 'index', type: 'index', title: '序号', hidden: false })
      }

      const properties = schema.properties
      Object.keys(properties).forEach((prop: string) => {
        const title = properties[prop].title || ''
        const ui = uiSchema[prop]
        const hidden = ui ? (ui[UI_HIDDEN] === true) : false
        if (!hidden) {
          columnSettings.value.push({ prop, title, hidden })
        }
      })
    }

    buildColumnSettings()

    const defaultIndexMethod = (index: number) => {
      const start = (innerCurrentPage.value - 1) * innerPageSize.value
      return (start + index + 1)
    }

    const renderIndex = () => (
      <ElTableColumn
        type="index"
        width="50"
        label="序号"
        align="center"
        fixed="left"
        index={props.indexMethod ? props.indexMethod : defaultIndexMethod}
      />
    )

    const renderSelectionCheckbox = () => (
      <ElTableColumn
        type="selection"
        width="50"
        align="center"
        fixed="left"
      />
    )

    const selectedRadio = ref<any>()

    const onSelectionRadioChange = (row: any) => {
      emit(EVENT_SELECTION_CHANGE, row ? [row] : [])
    }
    const renderSelectionRadio = () => {
      const slots = {
        default: (scope: any) => (
          <el-radio
            v-model={selectedRadio.value}
            label={scope.$index}
            onChange={() => onSelectionRadioChange(scope.row)}
          >&nbsp;</el-radio>
        )
      }
      return (
        <ElTableColumn
          width="50"
          fixed="left"
          align="center"
          v-slots={slots}>
        </ElTableColumn>
      )
    }

    const onRowButtonClick = (key: symbol, scope: CI<any>) => {
      emit(EVENT_ROW_BUTTON_CLICK, key, scope)
    }

    const buildRowButtonItem = (rowButton: RowButton, scope: CI<any>) => (
      <el-button size="mini" type="text"
        onClick={() => onRowButtonClick(rowButton.key, scope)}
      >{rowButton.label}</el-button>
    )

    const renderOptSlots = (scope: CI<any>) => {
      const rowButtons = props.rowButtons(scope)
      // 小于等于2个按钮时，直接展示
      // if (rowButtons.length <= 2) {
      return rowButtons.map((rowButton: RowButton) => (
        <el-button size="mini" type="text"
          onClick={() => onRowButtonClick(rowButton.key, scope)}
        >{rowButton.label}</el-button>
      ))
      // }

      // TODO 大于2个按钮时，先展示第一个，其余的在下拉菜单中展示
      const els: JSX.Element[] = []
      els.push(buildRowButtonItem(rowButtons[0], scope)) // 先添加第一个按钮
      // 添加dropdown
      els.push((
        <ElDropdown size="mini">
          <el-button type="text" size="mini">更多
            <el-icon class="el-icon--right">
              <ArrowDown/>
            </el-icon>
          </el-button>
          {{
            dropdown: () => (<el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
            </el-dropdown-menu>)
          }}
        </ElDropdown>
      ))
      return els
    }

    const renderRowButtons = () => {
      return (
        <ElTableColumn
          label="操作"
          width="120"
          fixed="right"
          align="center">
          {{ default: (scope: CI<any>) => renderOptSlots(scope) }}
        </ElTableColumn>
      )
    }

    const renderColumns = () => {
      const { properties } = props.schema
      const tableColumns: JSX.Element[] = []

      if (props.selectionType === 'checkbox') {
        tableColumns.push(renderSelectionCheckbox())
      } else if (props.selectionType === 'radio') {
        tableColumns.push(renderSelectionRadio())
      }

      // if (props.showIndex) {
      //   tableColumns.push(renderIndex())
      // }

      columnSettings.value.forEach((columnSettings: ColumnSetting) => {
        const prop = columnSettings.prop
        if (columnSettings.type === 'index' && !columnSettings.hidden) {
          tableColumns.push(renderIndex())
        } else if (!columnSettings.hidden) {
          const propertyItem = properties[prop]
          const uiItem = props.uiSchema[prop]
          tableColumns.push(renderColumn(prop, propertyItem, uiItem))
        }
      })
      // Object.keys(properties).forEach(prop => {
      //   const propertyItem = properties[prop]
      //   tableColumns.push(renderColumn(prop, propertyItem))
      // })

      if (typeof props.rowButtons === 'function') {
        tableColumns.push(renderRowButtons())
      }

      return tableColumns
    }

    const renderColumn = (prop: string, propertyItem: PropItem, uiItem: UiSchemaItem) => {
      return renderColumnBySchema(prop, propertyItem, uiItem, slots)
    }

    const innerCurrentPage = ref(props.currentPage <= 0 ? 1 : props.currentPage)
    const innerPageSize = ref(props.pageSize <= 0 ? 10 : props.pageSize)

    const innerData = computed(() => {
      const { data, isPseudoPaging, showPagination } = props
      if (isPseudoPaging && showPagination !== 'never') {
        const first = (innerCurrentPage.value - 1) * innerPageSize.value
        return data.slice(first, first + innerPageSize.value)
      }
      return props.data
    })

    const onCurrentChange = (currentPage: number) => {
      innerCurrentPage.value = currentPage
      if (props.selectionType === 'radio') {
        selectedRadio.value = null
      }
      emit(EVENT_CURRENT_CHANGE, {
        currentPage: innerCurrentPage.value,
        pageSize: innerPageSize.value
      })
    }

    const onSizeChange = (pageSize: number) => {
      innerPageSize.value = pageSize
      emit(EVENT_SIZE_CHANGE, {
        currentPage: innerCurrentPage.value,
        pageSize: innerPageSize.value
      })
    }

    const onCellClick = (row: any, column: TableColumn<any>, cell: HTMLElement, event: Event) => {
      if (tableRef.value) {
        if (props.selectionType === 'checkbox') {
          tableRef.value.toggleRowSelection(row)
        } else if (props.selectionType === 'radio') {
          const index = innerData.value.findIndex(item => item === row)
          if (selectedRadio.value !== index) {
            selectedRadio.value = index
            onSelectionRadioChange(innerData.value[index])
          }
        }
      }
      emit(EVENT_CELL_CLICK, row, column, cell, event)
    }

    const selectionList = ref<any>([])

    const onSelectionChange = (selection: any[]) => {
      selectionList.value = selection
      emit(EVENT_SELECTION_CHANGE, selection)
    }

    const onColumnSettingsCheckChange = (checked: boolean, columnSetting: ColumnSetting) => {
      columnSetting.hidden = !checked
      setTimeout(() => {
        tableRef.value.doLayout()
      }, 3000)
    }

    const onResetColumnSettingsClick = () => {
      columnSettings.value.forEach(columnSettings => {
        columnSettings.hidden = false
      })
      tableRef.value.doLayout()
    }

    const renderSetting = () => {
      return (
        <div class={`${NAME}__top--setting`}>
          {slots.setting && slots.setting()}
          {props.showColumnSetting ? (
            <el-popover width="120" trigger="hover">
              {{
                reference: () => (
                  <el-button type="text" size="mini">
                    <el-icon size={14}><Setting/></el-icon>
                    &nbsp;列设置
                  </el-button>
                ),
                default: () => (
                  <div>
                    <el-button type="text" size="mini" onClick={onResetColumnSettingsClick}>重置</el-button>
                    {columnSettings.value.map(columnSetting => (
                      <div>
                        <el-checkbox checked={!columnSetting.hidden} size="mini"
                          onChange={(checked: boolean) => onColumnSettingsCheckChange(checked, columnSetting)}
                        >{columnSetting.title}</el-checkbox>
                      </div>
                    ))}
                  </div>
                )
              }}
            </el-popover>

          ) : null}
        </div>
      )
    }

    const onOptCreateClick = () => {
      emit(EVENT_OPT_CREATE_CLICK)
    }
    const onOptBatchDeleteClick = () => {
      emit(EVENT_OPT_BATCH_DELETE_CLICK, selectionList.value)
    }

    const renderOpt = () => (
      <div class={`${NAME}__top--opt`}>
        {props.showOptCreate ? (
          <el-button type="text" size="mini"
            onClick={onOptCreateClick}>新增</el-button>
        ) : null}

        {props.showOptBatchDelete && props.selectionType ? (
          <el-button type="text" size="mini"
            onClick={onOptBatchDeleteClick}
            disabled={selectionList.value.length <= 0}>批量删除</el-button>
        ) : null}

        {slots.opt && slots.opt()}
      </div>
    )

    return () => {
      return (
        <div class={NAME}>
          <div class={`${NAME}__top`}>
            {renderOpt()}
            {renderSetting()}
          </div>
          <el-table
            ref={tableRef}
            data={innerData.value}
            fit={true}
            {...attrs}
            headerRowClassName={'header-row'}
            onCellClick={onCellClick}
            onSelectionChange={onSelectionChange}
          >
            {renderColumns()}
          </el-table>

          {['always', 'auto'].includes(props.showPagination) ? (
            <div class={`${NAME}__pager`}>
              <el-pagination
                background
                small
                layout="total, sizes, prev, pager, next, jumper, ->"
                total={props.isPseudoPaging ? props.data.length : props.total}
                hideOnSinglePage={props.showPagination === 'auto'}
                currentPage={innerCurrentPage.value}
                defaultCurrentPage={props.currentPage}
                onCurrentChange={onCurrentChange}
                pageSize={innerPageSize.value}
                defaultPageSize={props.pageSize}
                onSizeChange={onSizeChange}
                page-sizes={[5, 10, 20, 50, 100]}
              />
            </div>
          ) : null}

        </div>
      )
    }
  }
})
