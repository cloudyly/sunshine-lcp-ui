import { App } from 'vue'
import SsDemo from './demo'
import SsLayout from './layout'
import SsHeaderBar from './header-bar'
import SsAppLogo from './app-logo'
import SsLeftSide from './left-side'
import SsSvgIcon from './svg-icon'
import SsToggleLeft from './toggle-left'
import SsToggleScreen from './toggle-screen'
import SsPage from './page'
import SsCard from './card'
import SsTable from './table'
import SsForm from './form'
import SsSearchCard from './search-card'
import '../scss/index.scss'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const components = [
  SsDemo,
  SsLayout,
  SsHeaderBar,
  SsAppLogo,
  SsLeftSide,
  SsSvgIcon,
  SsToggleLeft,
  SsToggleScreen,
  SsPage,
  SsCard,
  SsTable,
  SsForm,
  SsSearchCard
] // end

const install: (app: App) => void = (app: App) => {
  // 引入 Element Plus
  app.use(ElementPlus, { size: 'mini', locale: zhCn })

  // 引入自定义组件
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  install,
  SsDemo,
  SsLayout,
  SsHeaderBar,
  SsAppLogo,
  SsLeftSide,
  SsSvgIcon,
  SsToggleLeft,
  SsToggleScreen,
  SsPage,
  SsCard,
  SsTable,
  SsForm,
  SsSearchCard
}

export default {
  install
}
