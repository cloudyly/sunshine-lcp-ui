import { computed, defineComponent } from 'vue'

const NAME = 'SsSvgIcon'

export default defineComponent({
  name: NAME,
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup (props) {
    const svgClass = computed(() => `${NAME} ${props.className}`)
    const svgIcon = computed(() => `#icon-${props.icon}`)
    return () => (
      <svg class={svgClass.value} aria-hidden="true">
        <use xlinkHref={svgIcon.value}></use>
      </svg>
    )
  }
})
