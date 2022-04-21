import { defineStore } from "pinia";

export const useGroceryStore = defineStore("grocery", {
  state: () => {
    return {
      groceryList: [],
    };
  },

  actions: {
    async fetchGroceryList() {
      const response = await fetch(
        "https://mocki.io/v1/be954200-f8ad-46f7-b57a-511674ebc4fb"
      );
      this.groceryList = await response.json();
    },
  },
});
