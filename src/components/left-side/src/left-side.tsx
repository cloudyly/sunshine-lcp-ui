import { computed, defineComponent } from 'vue'
import { useRenderSiteInfo } from '@/components/hooks/use-render-site-info'
import { useLayoutValues } from '@/components/hooks/use-layout-values'

const NAME = 'SsLeftSide'

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
      return useRenderSiteInfo(logoRef.value, appNameRef.value, layoutValues.layoutTypeRef.value, 'left')
    }

    return () => (
      <div class={NAME}>
        { renderSiteInfo() }
      </div>
    )
  }
})
