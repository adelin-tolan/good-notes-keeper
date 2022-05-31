<template>
  <v-app>
    <the-header />
    <the-main />
    <the-footer />

    <v-snackbar centered :color="snackbarColor" fixed :value="isSnackbarOpen">
      {{ snackbarText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheMain from "./components/TheMain.vue";
import TheFooter from "./components/TheFooter.vue";
import { bus } from "./main";

export default {
  name: "App",

  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },

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
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
