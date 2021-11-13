import { defineComponent } from 'vue'

const NAME = 'SsPage'

export default defineComponent({
  name: NAME,
  setup (props, context) {
    return () => (
      <div class={NAME}>
        <div class={`${NAME}__container`}>
          {context.slots.default && context.slots.default()}
        </div>
      </div>
    )
  }
})
