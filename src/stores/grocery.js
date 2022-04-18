import {bus} from '../main'
import { defineStore } from 'pinia'

export const useGroceryStore = defineStore('grocery', {
    state: () => {
        return {
           groceryList: [],
        }

    },

    actions: {
        async fetchGroceryList() {
            try {
                const response = await fetch("https://mocki.io/v1/be954200-f8ad-46f7-b57a-511674ebc4fb");
                 this.groceryList = await response.json();
                bus.$emit("api_success", "The initial grocery list has been loaded");
            } catch (err) {
                console.error(err);
                bus.$emit("api_error", err.message);
            }
        },
    },
  })


