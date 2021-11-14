import { computed, defineComponent, PropType, ref } from 'vue'
import { PropItem, Schema } from '@/components/types/common-types'
import { renderColumnBySchema } from '@/components/table/src/table-utils'
import { ElTable, ElTableColumn } from 'element-plus'

const NAME = 'SsTable'

const EVENT_CURRENT_CHANGE = 'current-change'
const EVENT_SIZE_CHANGE = 'size-change'

export default defineComponent({
  name: NAME,
  emits: [EVENT_CURRENT_CHANGE, EVENT_SIZE_CHANGE],
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    data: {
      type: Array,
      required: false,
      default: () => ([])
    },
    isShowIndex: {
      type: Boolean,
      required: false,
      default: false
    },
    indexMethod: {
      type: Function as PropType<(index: number) => number>,
      required: false,
      default: null
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
    }
  } as const,
  setup (props, { attrs, emit }) {
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
        index={props.indexMethod ? props.indexMethod : defaultIndexMethod}
      />
    )

    const renderColumns = () => {
      const { properties } = props.schema
      const tableColumns: JSX.Element[] = []

      if (props.isShowIndex) {
        tableColumns.push(renderIndex())
      }

      Object.keys(properties).forEach(prop => {
        const propertyItem = properties[prop]
        tableColumns.push(renderColumn(prop, propertyItem))
      })
      return tableColumns
    }

    const renderColumn = (prop: string, propertyItem: PropItem) => {
      return renderColumnBySchema(prop, propertyItem)
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

    return () => {
      return (
        <div class={NAME}>
          <ElTable
            data={innerData.value}
            {...attrs}
            headerRowClassName={'header-row'}
          >
            {renderColumns()}
          </ElTable>

          {['always', 'auto'].includes(props.showPagination) ? (
            <div class={`${NAME}__pager`}>
              <el-pagination
                background
                small
                layout="prev, pager, next, jumper, sizes, ->, aa"
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
