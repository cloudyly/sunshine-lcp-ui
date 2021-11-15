import { App } from 'vue'
import SsForm from './src/form'

SsForm.install = (app: App) => {
  app.component(SsForm.name, SsForm)
}

export default SsForm
