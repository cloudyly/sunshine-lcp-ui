import { defineComponent } from 'vue'

const NAME = 'SsHeaderBar'

export default defineComponent({
  name: NAME,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        header-bar
      </div>
    )
  }
})
