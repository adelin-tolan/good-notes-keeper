<template>
  <v-footer class="success accent-4 white--text">
    <v-container>
      <v-row class="footer-row mx-auto pt-2 d-flex justify-space-between">
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="d-flex justify-center justify-sm-start"
        >
          <div class="mr-4">test@test.com</div>
          <div class="mr-4">|</div>
          <div>www.test.com</div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="d-flex justify-center justify-sm-end justify-md-center"
        >
          ©{{ new Date().getFullYear() }} —
          <strong>Adelin's Notes Keeper</strong>
        </v-col>
        <v-col cols="12" md="4" class="d-flex justify-center justify-md-end">
          <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
            <v-icon size="24px"> mdi-{{ icon }} </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return {
      icons: ["facebook", "twitter", "linkedin", "github"],
    };
  },
};
</script>

<style lang="css" scoped>
.footer-row {
  max-width: 1170px;
}
</style>
