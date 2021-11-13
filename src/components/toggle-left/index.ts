import { App } from 'vue'
import SsToggleLeft from './src/toggle-left'

SsToggleLeft.install = (app: App) => {
  app.component(SsToggleLeft.name, SsToggleLeft)
}

export default SsToggleLeft
