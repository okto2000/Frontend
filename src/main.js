import './assets/style.css'
//in your `main.js` file
import '../node_modules/flowbite-vue/dist/index.css'
import vue3GoogleLogin from 'vue3-google-login'
let gAuthClientId = '828381666653-bp3cldvubnp9qsoc6qvpb4ophlfku1ui.apps.googleusercontent.com'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(vue3GoogleLogin, {
    clientId: gAuthClientId,
    scope: 'email',
    prompt: 'consent',
  })

app.use(createPinia())
app.use(router)

app.mount('#app')
