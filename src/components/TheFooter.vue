<template>
  <v-footer class="success accent-4 white--text">
    <v-container>
      <v-row class="footer-row mx-auto pt-2 d-flex justify-space-between">
        <v-col
          class="d-flex justify-center justify-sm-start"
          cols="12"
          md="4"
          sm="6"
        >
          <div class="mr-4">
            test@test.com
          </div>
          <div class="mr-4">
            |
          </div>
          <div>www.test.com</div>
        </v-col>
        <v-col
          class="d-flex justify-center justify-sm-end justify-md-center"
          cols="12"
          md="4"
          sm="6"
        >
          ©{{ getCurrentYear }} —
          <strong>{{ $t("titles.appTitle") }}</strong>
        </v-col>
        <v-col class="d-flex justify-center justify-md-end" cols="12" md="4">
          <v-btn
            v-for="icon in socialIcons"
            :key="icon"
            class="mx-3"
            dark
            icon
          >
            <v-icon size="24px">
              mdi-{{ icon }}
            </v-icon>
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
      socialIcons: ["facebook", "twitter", "linkedin", "github"],
    };
  },

  computed: {
    getCurrentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-row {
  max-width: 1170px;
}
</style>
