import {bus} from '../main'
import { defineStore } from 'pinia'

export const useGroceryList = defineStore('grocery', {
    state: () => {
        return {
           groceryList: [],
        }

    },
    getters: {
 
    },
    actions: {
        async fetchGroceryList() {
            try {
                const response = await fetch("https://mocki.io/v1/4a100cdb-3497-45d4-94b5-5c0e7cd951db");
                 this.groceryList = await response.json();
                bus.$emit("api_success", "The initial grocery list has been loaded");
            } catch (err) {
                console.error(err);
                bus.$emit("api_error", err.message);
            }
        },
    },
  })


