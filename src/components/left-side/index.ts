import { App } from 'vue'
import SsLeftSide from './src/left-side'

SsLeftSide.install = (app: App) => {
  app.component(SsLeftSide.name, SsLeftSide)
}

export default SsLeftSide
