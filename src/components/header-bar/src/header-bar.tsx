import { computed, defineComponent, PropType, ref } from 'vue'
import { useLayoutValues } from '../../hooks/use-layout-values'
import { useRenderSiteInfo } from '../../hooks/use-render-site-info'
import { LayoutType } from '../../layout/src/constant'

const NAME = 'SsHeaderBar'

export interface NavItem {
  code: string;
  name: string;
}

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
    },
    isShowToggleScreen: {
      type: Boolean,
      required: false,
      default: true
    },
    fullName: {
      type: String,
      required: false,
      default: ''
    },
    navList: {
      type: Array as PropType<NavItem[]>,
      required: false,
      default: () => ([])
    },
    defaultActiveNav: {
      type: String,
      required: false,
      default: null
    }
  },
  setup (props, context) {
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

    const innerActiveNavRef = ref(props.defaultActiveNav
      ? props.defaultActiveNav
      : (props.navList.length > 0 ? props.navList[0].code : ''))

    const onNavItemClick = (navItem: NavItem) => {
      innerActiveNavRef.value = navItem.code
      context.emit('nav-click', navItem)
    }

    return () => {
      return (
        <div class={NAME}>
          {renderSiteInfo()}

          {renderToggleBtn()}

          {/* 渲染顶部导航菜单列表 */}
          <div class={`${NAME}--menu-list`}>
            {
              props.navList.map((item) => {
                const className = item.code === innerActiveNavRef.value ? 'menu-item active' : 'menu-item'
                return (
                  <div class={className} onClick={() => onNavItemClick(item)}>{item.name}</div>
                )
              })
            }
          </div>

          <div class={`${NAME}--opt-list`}>
            {/* 渲染切换全屏按钮 */}
            {props.isShowToggleScreen ? <ss-toggle-screen/> : null}
            {/* 渲染用户名 */}
            {props.fullName ? <span class='full-name'>当前用户： {props.fullName}</span> : null}
          </div>
        </div>
      )
    }
  }
})
