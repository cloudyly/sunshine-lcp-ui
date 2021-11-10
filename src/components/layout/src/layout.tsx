import { defineComponent } from 'vue'

const NAME = 'SsLayout'

export default defineComponent({
  name: NAME,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        layout
      </div>
    )
  }
})
