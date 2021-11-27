import { computed, defineComponent } from 'vue'
import emitter, { EVENT_EXPAND_LEFT } from '../../emitter'

const NAME = 'SsToggleLeft'

export default defineComponent({
  name: NAME,
  props: {
    isExpand: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const innerIsExpand = computed(() => props.isExpand)
    const onBtnClick = () => {
      emitter.emit(EVENT_EXPAND_LEFT, !innerIsExpand.value)
    }
    return () => {
      const className = innerIsExpand.value ? `${NAME}` : `${NAME}--is-collapse`
      return (
        <div class={className} onClick={onBtnClick}>
          <ss-svg-icon icon='menu-btn'></ss-svg-icon>
        </div>
      )
    }
  }
})
