<template>
  <div>
    <v-app-bar color="success accent-4" dark class="py-2">
      <v-container fixed fluid class="px-0 py-0">
        <v-row class="header-row mx-auto">
          <router-link to="/">
            <v-img
              max-height="40"
              max-width="40"
              src="../assets/paper-logo.svg"
            ></v-img>
          </router-link>

          <v-spacer></v-spacer>
          <v-toolbar-title @click="handleHomeRouterLink">{{
            $t("message.main.appTitle")
          }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  methods: {
    handleHomeRouterLink() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="css" scoped>
.header-row {
  max-width: 1170px;
}
</style>
