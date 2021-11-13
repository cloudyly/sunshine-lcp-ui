import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 sunshine-ui 组件库
import SunshineUI from './components'

// 加载SVG
const allRequireSvg: __WebpackModuleApi.RequireContext = require.context('./icons/svg', false, /\.svg$/)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  requireContext.keys().map(requireContext)
}
requireAll(allRequireSvg)

const app = createApp(App)
app.use(SunshineUI)
app.use(store)
  .use(router)
  .mount('#app')
