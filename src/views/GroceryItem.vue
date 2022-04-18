<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <p class="text-h4 text--primary">Product: {{ currentProduct.name }}</p>
      <p class="text--primary">Quantity: {{ currentProduct.quantity }}</p>
      <p class="text--primary">Unit: {{ currentProduct.unitMeasure }}</p>
      <p class="text--primary">Prchased: {{ currentProduct.isPurchased }}</p>
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
    currentProduct() {
      return this.groceryList.find(
        (product) => product.id === this.currentRouteId
      );
    },
  },
};
</script>
