// import './plugins/bootstrap-vue'
// import '@babel/polyfill'
// import 'mutationobserver-shim'
// import './plugins/bootstrap-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/src/jquery.js'
import './axios'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/js/bootstrap.js'


createApp(App).use(store).use(router).mount('#app')