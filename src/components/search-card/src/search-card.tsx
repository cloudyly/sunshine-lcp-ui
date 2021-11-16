import { defineComponent } from 'vue'

const NAME = 'SsSearchCard'

export default defineComponent({
  name: NAME,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        search-card
      </div>
    )
  }
})
