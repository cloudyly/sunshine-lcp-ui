import { App } from 'vue'
import SsTable from './src/table'

SsTable.install = (app: App) => {
  app.component(SsTable.name, SsTable)
}

export default SsTable
