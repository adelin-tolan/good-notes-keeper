<template>
  <v-app>
    <the-header />
    <div :class="{ 'home-page-background': !isNotHomeRoute }">
      <v-tabs class="tabs mx-auto my-4 pl-6" v-if="isNotHomeRoute">
        <v-tab to="/notes">{{ $t("message.features.notes") }}</v-tab>
        <v-tab to="/grocery-list">{{
          $t("message.features.groceryList")
        }}</v-tab>
      </v-tabs>
      <router-view class="main-display py-6 mx-auto"></router-view>
    </div>
    <the-footer />

    <v-snackbar :value="isSnackbarOpen" fixed centered :color="snackbarColor">
      {{ snackbarText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { bus } from "./main";

export default {
  name: "App",

  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      isSnackbarOpen: false,
      snackbarText: "",
      snackbarColor: "",
    };
  },
  computed: {
    isNotHomeRoute() {
      return this.$route.path !== "/";
    },
  },
  created() {
    bus.$on("api_success", (data) => {
      this.snackbarText = data;
      this.snackbarColor = "green darken-4";
      this.isSnackbarOpen = true;
      setTimeout(() => {
        this.isSnackbarOpen = false;
      }, 5000);
    });

    bus.$on("api_error", (data) => {
      this.snackbarText = data;
      this.snackbarColor = "red accent-2";
      this.isSnackbarOpen = true;
      setTimeout(() => {
        this.isSnackbarOpen = false;
      }, 5000);
    });
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
