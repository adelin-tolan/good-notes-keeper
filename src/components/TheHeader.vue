<template>
  <div>
    <v-app-bar class="py-2" color="success accent-4" dark>
      <v-container class="px-0 py-0" fixed fluid>
        <v-row class="header-row px-3 mx-auto">
          <router-link to="/">
            <v-img
              max-height="40"
              max-width="40"
              src="../assets/paper-logo.svg"
            />
          </router-link>

          <v-spacer />
          <v-toolbar-title @click="handleHomeRouterLink">
            {{
              $t("titles.appTitle")
            }}
          </v-toolbar-title>
          <v-spacer />

          <v-btn icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>

    <the-menu />
  </div>
</template>

<script>
import TheMenu from "./TheMenu";

export default {
  name: "TheHeader",

  components: {
    TheMenu,
  },

  methods: {
    handleHomeRouterLink() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="css" scoped>
.header-row {
  max-width: 1170px;
}
</style>
