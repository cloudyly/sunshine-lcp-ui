import { App } from 'vue'
import SsDemo from './src/demo'

SsDemo.install = (app: App) => {
  app.component(SsDemo.name, SsDemo)
}

export default SsDemo
