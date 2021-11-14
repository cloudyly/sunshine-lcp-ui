import { defineComponent, PropType } from 'vue'
import { PropItem, Schema } from '@/components/types/common-types'
import { renderColumnBySchema } from '@/components/table/src/table-utils'
import { ElTable } from 'element-plus'

const NAME = 'SsTable'

export default defineComponent({
  name: NAME,
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    data: {
      type: Array,
      required: false,
      default: () => ([])
    }
  },
  setup (props, { attrs }) {
    const renderColumns = () => {
      const { properties } = props.schema
      return Object.keys(properties).map(prop => {
        const propertyItem = properties[prop]
        return renderColumn(prop, propertyItem)
      })
    }

    const renderColumn = (prop: string, propertyItem: PropItem) => {
      return renderColumnBySchema(prop, propertyItem)
    }
    return () => {
      return (
        <div class={NAME}>
          <ElTable data={props.data} {...attrs}>
            { renderColumns() }
          </ElTable>
        </div>
      )
    }
  }
})
