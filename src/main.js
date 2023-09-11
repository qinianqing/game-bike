import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

import App from "./App.vue"
import router from "./router"
import "vant/lib/index.css"

const app = createApp(App)

const pinia = createPinia()
//pina持久化
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)

app.mount("#app")
