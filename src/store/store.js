import Vue from 'vue'
import Vuex from 'vuex'
import {bus} from '../main'

Vue.use(Vuex);


const notesModule = {
    state: {
        notesList: [],
    },

    getters: {
        notesList(state) {
            return state.notesList;
        },
        sortedNotesList(state) {
            return state.notesList.sort((a, b) => b.isHighImportance - a.isHighImportance);
        },
    },

    mutations: {
        setNotesList(state, notesList) {
            state.notesList = notesList;
        },
    },

    actions: {
        async FETCH_NOTES_LIST(context) {
            const response = await fetch("https://mocki.io/v1/1c2ad75c-6989-4051-9d76-3aceb475d3d2");
            context.commit("setNotesList", await response.json());   
          },
    }
}

const groceryModule = {
    state: {
        groceryList: [],
         },

    getters: {
        groceryList(state) {
            return state.groceryList;
        },
    },

    mutations: {
        setGroceryList(state, groceryList) {
            state.groceryList = groceryList;
        },

    },
    actions: {
        async FETCH_GROCERY_LIST(context) {
            try {
                const response = await fetch("https://mocki.io/v1/4a100cdb-3497-45d4-94b5-5c0e7cd951db");
                context.commit('setGroceryList', await response.json());
                bus.$emit("api_success", "The initial grocery list has been loaded");
            } catch (err) {
                console.error(err);
                bus.$emit("api_error", err.message);
            }
        },
    },

}


export const store = new Vuex.Store({

    modules: {
        a: notesModule,
        b: groceryModule,
    }
})


