import { App } from 'vue'
import SsToggleScreen from './src/toggle-screen'

SsToggleScreen.install = (app: App) => {
  app.component(SsToggleScreen.name, SsToggleScreen)
}

export default SsToggleScreen
