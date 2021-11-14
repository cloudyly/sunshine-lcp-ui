import { defineComponent, PropType } from 'vue'
import { Schema } from '@/components/types/common-types'

const NAME = 'SsTable'

export default defineComponent({
  name: NAME,
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    }
  },
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <pre>
          {JSON.stringify(props.schema, null, 2)}
        </pre>
      </div>
    )
  }
})
