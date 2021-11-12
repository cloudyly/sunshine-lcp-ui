import { App } from 'vue'
import SsDemo from './demo'
import SsLayout from './layout'
import SsHeaderBar from './header-bar'
import SsAppLogo from './app-logo'
import SsLeftSide from './left-side'
import '../scss/index.scss'

const components = [
  SsDemo,
  SsLayout,
  SsHeaderBar,
  SsAppLogo,
  SsLeftSide
] // end

const install: (app: App) => void = (app: App) => {
  // 引入 Element Plus
  // app.use(ElementPlus)

  // 引入自定义组件
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install
}
