import { App } from 'vue'
import SsLayout from './src/layout'

SsLayout.install = (app: App) => {
  app.component(SsLayout.name, SsLayout)
}

export default SsLayout
