<template>
  <v-app>
    <the-header />
    <div :class="{ 'home-page-background': !!(this.$route.path === '/') }">
      <v-tabs class="tabs mx-auto my-4 pl-6" v-if="this.$route.path !== '/'">
        <v-tab to="/notes">Notes</v-tab>
        <v-tab to="/grocery-list">Grocery List</v-tab>
      </v-tabs>
      <router-view class="main-display py-6 mx-auto"></router-view>
    </div>
    <the-footer />
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
export default {
  name: "App",

  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-display,
.tabs {
  width: 100%;
  max-width: 1170px !important;
}

.main-display {
  min-height: 635px;
}

.home-page-background {
  background: lightgrey !important;
}
</style>
