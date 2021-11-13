import { App } from 'vue'
import SsPage from './src/page'

SsPage.install = (app: App) => {
  app.component(SsPage.name, SsPage)
}

export default SsPage
