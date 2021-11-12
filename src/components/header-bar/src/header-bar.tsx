import { computed, defineComponent } from 'vue'
import { useLayoutValues } from '@/components/hooks/use-layout-values'
import { useRenderSiteInfo } from '@/components/hooks/use-render-site-info'

const NAME = 'SsHeaderBar'

export default defineComponent({
  name: NAME,
  props: {
    logo: {
      type: String,
      required: false,
      default: ''
    },
    appName: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup (props) {
    const layoutValues = useLayoutValues()

    const renderSiteInfo = () => {
      const logoRef = computed(() => props.logo)
      const appNameRef = computed(() => props.appName)
      return useRenderSiteInfo(logoRef.value, appNameRef.value, layoutValues.layoutTypeRef.value, 'top')
    }
    return () => {
      return (
        <div class={NAME}>
          { renderSiteInfo() }
          <div class={`${NAME}--menu-list`}>Menu-List</div>
          <div class={`${NAME}--opt-list`}>opt-btn-group</div>
        </div>
      )
    }
  }
})
