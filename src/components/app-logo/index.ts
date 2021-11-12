import { App } from 'vue'
import SsAppLogo from './src/app-logo'

SsAppLogo.install = (app: App) => {
  app.component(SsAppLogo.name, SsAppLogo)
}

export default SsAppLogo
