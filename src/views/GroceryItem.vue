<template>
  <div>
    <v-skeleton-loader
      class="pa-4"
      elevation="2"
      :loading="isGroceryLoading"
      type="text@4"
      :types="types"
    >
      <v-card class="ma-n4" max-width="380">
        <v-card-text>
          <p class="text-h4 text--primary">
            {{ $t("labels.grocery") }}: {{ grocery.name }}
          </p>
          <p class="text--primary">{{ $t("labels.quantity") }}: {{ grocery.quantity }}</p>
          <p class="text--primary">{{ $t("labels.unit") }}: {{ grocery.unitMeasure }}</p>
          <p class="text--primary">
            {{ $t("labels.purchased") }}: {{ grocery.isPurchased }}
          </p>
        </v-card-text>
      </v-card>
    </v-skeleton-loader>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useGroceryStore } from "@/stores/grocery";

export default {
  name: "GroceryItem",

  data() {
    return {
      isGroceryLoading: false,
    };
  },

  computed: {
    ...mapState(useGroceryStore, ["groceryList"]),
    currentRouteId() {
      return this.$route.params.groceryItemId;
    },
    grocery() {
      return this.groceryList.find((grocery) => grocery.id === this.currentRouteId);
    },
  },

  mounted() {
    this.isGroceryLoading = true;
    setTimeout(() => {
      this.isGroceryLoading = false;
    }, 2000);
  },
};
</script>

<style lang="scss">
.v-skeleton-loader {
  $sizes: 300px, 100px, 90px, 110px;

  max-width: 380px;

  @each $size in $sizes {
    $i: index($sizes, $size);
    .v-skeleton-loader__text:nth-child(#{$i}) {
      max-width: $size;
      margin-bottom: 20px;
    }
  }

  .v-skeleton-loader__text:nth-child(1) {
    height: 35px;
    margin-top: 20px;
  }
}
</style>
