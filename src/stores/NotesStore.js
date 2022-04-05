import { defineStore } from 'pinia'

export const useNotesList = defineStore('notes', {
    state: () => {
        return {
           notesList: [], 
        }
    },
    getters: {
        sortedNotesList(state) {
            return state.notesList.sort((a,b)=>b.isHighImportance - a.isHighImportance);
        }
    },
    actions: {
        async fetchNotesList() {           
            const response = await fetch("https://mocki.io/v1/1c2ad75c-6989-4051-9d76-3aceb475d3d2")
            this.notesList = await response.json();      
        }
    }
})