
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import vuetify from './plugins/vuetify'

import articles from './store/modules/articles'
import comments from './store/modules/comments'

const store = createStore({
    modules: {
        articles,
        comments
    }
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')