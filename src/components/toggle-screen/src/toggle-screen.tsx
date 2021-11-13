import { defineComponent } from 'vue'

const NAME = 'SsToggleScreen'

export default defineComponent({
  name: NAME,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        toggle-screen
      </div>
    )
  }
})