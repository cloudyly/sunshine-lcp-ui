import { App } from 'vue'
import SsDemo from './demo'
import '../scss/index.scss'

const components = [
  SsDemo
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
