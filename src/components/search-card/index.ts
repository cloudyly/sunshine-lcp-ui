import { App } from 'vue'
import SsSearchCard from './src/search-card'

SsSearchCard.install = (app: App) => {
  app.component(SsSearchCard.name, SsSearchCard)
}

export default SsSearchCard
