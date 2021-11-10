import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 sunshine-ui 组件库
import SunshineUI from './components'

const app = createApp(App)
app.use(SunshineUI)
app.use(store)
  .use(router)
  .mount('#app')
