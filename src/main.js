import { createApp } from 'vue'
import Mitt from 'mitt'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css'
import './assets/css/cover.scss'

import Components from './components'

const app = createApp(App)
app.config.globalProperties.$bus = new Mitt()
Object.entries(Components).map(([k, v]) => {
  app.component(k, v)
})
app.use(router)
app.use(createPinia().use(piniaPersist))
app.mount('#app')
