import { App } from 'vue'
import SsCard from './src/card'

SsCard.install = (app: App) => {
  app.component(SsCard.name, SsCard)
}

export default SsCard
