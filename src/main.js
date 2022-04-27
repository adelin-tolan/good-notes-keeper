import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";

import HomePage from "./views/HomePage";
import MainNotesContent from "./views/MainNotesContent";
import MainGroceryListContent from "./views/MainGroceryListContent";
import GroceryItem from "./views/GroceryItem";

import { englishVersion } from "./locales/en.js";

import { createPinia, PiniaVuePlugin } from "pinia";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

Vue.component("v-select", vSelect);

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueI18n);

const routes = [
  { path: "/", name: "Homepage", component: HomePage },
  { path: "/notes", name: "Notes", component: MainNotesContent },
  {
    path: "/grocery-list",
    name: "Grocery List",
    component: MainGroceryListContent,
  },
  {
    path: "/grocery-list/:groceryItemId",
    name: "Grocery Item",
    component: GroceryItem,
  },
];

export const router = new VueRouter({ routes, base: "/", mode: "history" });

const messages = {
  locale: englishVersion,
};

const i18n = new VueI18n({
  locale: "locale",
  messages,
});

export const bus = new Vue();

new Vue({
  vuetify,
  router,
  i18n,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
