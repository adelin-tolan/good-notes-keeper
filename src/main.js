import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import HomePage from '../src/components/HomePage'
import MainNotesContent from '../src/components/MainNotesContent'
import MainGroceryListContent from '../src/components/MainGroceryListContent'


Vue.use(VueRouter);

Vue.config.productionTip = false

// const HomePage = {template: '<div>Homepage</div>'}
// const NotesPage = {template: '<div>Notes page</div>'}
// const GroceryList = {template: '<div>Grocery list</div>'}


 const routes = [
   {path: '/', name: 'Homepage', component: HomePage},
   {path: '/notes', name: 'Notes', component: MainNotesContent},
   {path: '/grocery-list', name: 'Grocery List', component: MainGroceryListContent},
  
  ]

  const router = new VueRouter({routes, base: '/', mode: 'history'})



new Vue({
  vuetify, router,
  render: h => h(App)
}).$mount('#app')
