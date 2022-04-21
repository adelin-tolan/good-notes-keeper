import { defineStore } from "pinia";

export const useNotesStore = defineStore("notes", {
  state: () => {
    return {
      notesList: [],
    };
  },

  getters: {
    sortedNotesListByImportance(state) {
      return state.notesList.sort(
        (a, b) => b.isHighImportance - a.isHighImportance
      );
    },
  },
  
  actions: {
    async fetchNotesList() {
      const response = await fetch(
        "https://mocki.io/v1/53796a2b-1545-415d-aee5-7e57e190bccb"
      );
      this.notesList = await response.json();
    },
  },
});
