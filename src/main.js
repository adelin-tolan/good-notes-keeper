import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueI18n from 'vue-i18n'

import HomePage from '../src/components/HomePage'
import MainNotesContent from '../src/components/MainNotesContent'
import MainGroceryListContent from '../src/components/MainGroceryListContent'

import {englishVersion} from "./locales/en.js"


Vue.config.productionTip = false


// Router

Vue.use(VueRouter);
Vue.use(VueI18n);

 const routes = [
   {path: '/', name: 'Homepage', component: HomePage},
   {path: '/notes', name: 'Notes', component: MainNotesContent},
   {path: '/grocery-list', name: 'Grocery List', component: MainGroceryListContent},
  
  ]

  const router = new VueRouter({routes, base: '/', mode: 'history'})


// i18n

  const messages = {
    locale: englishVersion
  }

  const i18n = new VueI18n({
    locale: 'locale',
    messages,
  })


export const bus = new Vue();


new Vue({
  vuetify, router, i18n,
  render: h => h(App)
}).$mount('#app')
