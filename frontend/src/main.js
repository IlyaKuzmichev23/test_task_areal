
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import vuetify from './plugins/vuetify'

const store = createStore({
    state: {

    },
    mutations: {
    
    },
    actions: {
    
    },
    getters: {
    
    }
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')