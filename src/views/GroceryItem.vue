<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <p class="text-h4 text--primary">Product: {{ product.name }}</p>
      <p class="text--primary">Quantity: {{ product.quantity }}</p>
      <p class="text--primary">Unit: {{ product.unitMeasure }}</p>
      <p class="text--primary">Prchased: {{ product.isPurchased }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "pinia";
import { useGroceryStore } from "@/stores/grocery";

export default {
  name: "GroceryItem",

  computed: {
    ...mapState(useGroceryStore, ["groceryList"]),
    currentRouteId() {
      return this.$route.params.groceryItemId;
    },
    product() {
      return this.groceryList.find(
        (product) => product.id === this.currentRouteId
      );
    },
  },
};
</script>
