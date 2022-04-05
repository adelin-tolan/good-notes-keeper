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
import { useGroceryList } from "@/stores/GroceryStore";

export default {
  name: "GroceryItem",

  computed: {
    ...mapState(useGroceryList, ["groceryList"]),
    currentRouteId() {
      return this.$route.params.groceryItemId;
    },
    currentProduct() {
      return this.groceryList.find((el) => el.id === this.currentRouteId);
    },
  },
};
</script>
