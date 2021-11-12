import { App } from 'vue'
import SsHeaderBar from './src/header-bar'

SsHeaderBar.install = (app: App) => {
  app.component(SsHeaderBar.name, SsHeaderBar)
}

export default SsHeaderBar
