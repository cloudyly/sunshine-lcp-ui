import { computed, defineComponent } from 'vue'
import { useLayoutValues } from '@/components/hooks/use-layout-values'
import { useRenderSiteInfo } from '@/components/hooks/use-render-site-info'
import { LayoutType } from '@/components/layout/src/constant'

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
    },
    isShowToggleLeft: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (props) {
    const layoutValues = useLayoutValues()

    const renderSiteInfo = () => {
      const logoRef = computed(() => props.logo)
      const appNameRef = computed(() => props.appName)
      return useRenderSiteInfo(logoRef.value, appNameRef.value, layoutValues.layoutTypeRef.value, 'top')
    }

    const renderToggleBtn = () => {
      if (!props.isShowToggleLeft) {
        return null
      }
      if ([LayoutType.LTB, LayoutType.TLR].indexOf(layoutValues.layoutTypeRef.value) < 0) {
        return null
      }
      return (
        <div class={`${NAME}--toggle-btn`}>
          <ss-toggle-left is-expand={layoutValues.isExpandRef.value}/>
        </div>
      )
    }
    return () => {
      return (
        <div class={NAME}>
          { renderSiteInfo() }

          { renderToggleBtn() }
          <div class={`${NAME}--menu-list`}>
            menu-list
          </div>
          <div class={`${NAME}--opt-list`}>
          </div>
        </div>
      )
    }
  }
})
