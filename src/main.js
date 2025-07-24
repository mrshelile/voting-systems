// src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios'

// Import Bootstrap CSS and JS (no jQuery)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js' // bundle.js has no jQuery dependency
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
