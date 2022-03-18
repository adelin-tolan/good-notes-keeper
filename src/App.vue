<template>
  <v-app>
    <the-header />
    <router-view class="main-display mx-auto py-6"></router-view>
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

.main-display {
  width: 100%;
  max-width: 600px !important;
  min-height: 635px;
}

router-link {
  text-decoration: none;
}
</style>
