<template>
  <div>
    <v-container>
      <v-row>
        <note-item
          v-for="(note, index) in sortedNotesList"
          :noteTitle="note.noteTitle"
          :noteContent="note.noteContent"
          :noteAuthor="note.noteAuthor"
          :noteDateCreated="formatDate(note.noteDateCreated)"
          :isHighImportance="note.isHighImportance"
          :keywords="note.keywords"
          :key="index"
        ></note-item>
      </v-row>

      <v-btn color="success" dark @click="showHideForm" class="my-6">
        {{
          isVisibleForm
            ? $t("message.buttons.hideForm")
            : $t("message.buttons.addNote")
        }}
      </v-btn>

      <add-note-form
        v-if="isVisibleForm"
        @on-click-add-keyword="addKeyword"
        @on-click-add-node="addNewNote"
        @on-click-reset="resetForm"
      >
      </add-note-form>

      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-container>
  </div>
</template>

<script>
import NoteItem from "./NoteItem.vue";
import AddNoteForm from "./AddNoteForm.vue";
import { bus } from "../main";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NotesContainer",
  components: {
    NoteItem,
    AddNoteForm,
  },
  data() {
    return {
      isVisibleForm: false,
      noteTitle: "",
      noteContent: "",
      noteAuthor: "",
      isHighImportance: false,
      noteKeyword: "",
      keywords: [],
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["FETCH_NOTES_LIST"]),

    addPadStart(el) {
      return String(el).padStart(2, 0);
    },
    currentDate() {
      const d = new Date();
      return `${d.getFullYear()}-${this.addPadStart(
        d.getDate()
      )}-${this.addPadStart(d.getMonth() + 1)}T${this.addPadStart(
        d.getHours()
      )}:${this.addPadStart(d.getMinutes())}:${this.addPadStart(
        d.getSeconds()
      )}`;
    },

    formatDate(date) {
      const d = date.split("T");
      const d0 = d[0].split("-");
      return `${d0[1]}/${d0[2]}/${d0[0]}, ${d[1]}`;
    },
    showHideForm() {
      this.isVisibleForm = !this.isVisibleForm;
    },
    addKeyword(keyword) {
      this.keywords.push(keyword);
    },

    resetForm() {
      this.noteTitle = "";
      this.noteContent = "";
      this.noteAuthor = "";
      this.isHighImportance = "";
      this.keywords = [];
    },

    addNewNote(title, content, author, isHighImportance, keywordsList) {
      this.notesList.push({
        noteTitle: title || "empty",
        noteContent: content || "empty",
        noteAuthor: author || "empty",
        noteDateCreated: this.currentDate(),
        isHighImportance: Boolean(isHighImportance),
        keywords: keywordsList,
      });

      this.resetForm();
    },
  },
  computed: {
    ...mapGetters(["notesList"]),

    sortedNotesList() {
      return this.$store.getters.sortedNotesList;
    },
  },

  created() {
    try {
      this.isLoading = true;
      this.FETCH_NOTES_LIST();
      bus.$emit("api_success", "The initial notes list has been loaded");
    } catch (err) {
      console.error(err);
      bus.$emit("api_error", err.message);
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 0);
    }
  },
};
</script>
