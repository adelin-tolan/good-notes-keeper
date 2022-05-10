<template>
  <div>
    <v-skeleton-loader
      :type="responsiveSkeletonComponents"
      :types="responsiveCustomTypes"
    ></v-skeleton-loader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skeletonComponentsOnDesktop: "image, textCol, text@3",
      skeletonComponentsOnMobile: "image, textCol, text",
      skeletonTypesOnDesktop: {
        textCol: "text@4",
      },
      skeletonTypesOnMobile: {
        textCol: "text@5",
      },
    };
  },

  computed: {
    responsiveSkeletonComponents() {
      return this.$vuetify.breakpoint.mobile
        ? this.skeletonComponentsOnMobile
        : this.skeletonComponentsOnDesktop;
    },

    responsiveCustomTypes() {
      return this.$vuetify.breakpoint.mobile
        ? this.skeletonTypesOnMobile
        : this.skeletonTypesOnDesktop;
    },
  },
};
</script>

<style lang="scss">
.v-skeleton-loader {
  padding: 1rem;
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;

  .v-skeleton-loader__image {
    width: 200px;
    height: 200px;
    align-self: center;
  }

  .v-skeleton-loader__textCol {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-self: stretch;
    justify-content: space-between;

    .v-skeleton-loader__text {
      flex-grow: 0;
    }

    .v-skeleton-loader__text:nth-child(2) {
      margin-bottom: 1rem;
    }
  }

  .v-skeleton-loader__text {
    height: 1.5vw;
    max-height: 1.5rem;
  }
}
</style>
