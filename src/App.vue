<template>
  <v-app>
    <the-header />
    <div :class="{ 'home-page-background': isHomeRoute }">
      <router-view class="main-display pa-6 mx-auto"></router-view>
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
import { isHomeRouteMixin } from "./mixins/isHomeRouteMixin";

export default {
  name: "App",

  components: {
    TheHeader,
    TheFooter,
  },

  mixins: [isHomeRouteMixin],

  data() {
    return {
      isSnackbarOpen: false,
      snackbarText: "",
      snackbarColor: "",
    };
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

  mounted() {
    console.log(
      `Working on ${process.env.VUE_APP_MODE} mode. URL: ${process.env.VUE_APP_SERVICE_URL}`
    );
  },
};
</script>

<style lang="scss">
$home-page-bg-color: lightgrey;

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
  background: $home-page-bg-color !important;
}
</style>
