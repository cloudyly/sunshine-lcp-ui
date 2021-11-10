import { defineComponent } from 'vue'

const NAME = 'SsDemo'

export default defineComponent({
  name: NAME,
  props: {
    msg: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={NAME}>
        <h1>Hello SunShine-UI</h1>
        <p class={NAME + '__description'}>{ props.msg }</p>
      </div>
    )
  }
})
