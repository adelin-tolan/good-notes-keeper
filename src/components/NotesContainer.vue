<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="pl-md-3 pr-md-3 px-3">
          <chart-container :title="chartTitle" :subtitle="chartSubtitleText">
            <line-chart-4 :chartData="datesAndNumberOfNotesListForChart(4)" />
          </chart-container>
        </v-col>
        <v-col cols="12" md="6" class="pr-md-3 pl-md-3 px-3">
          <chart-container :title="chartTitle" :subtitle="chartSubtitleText">
            <line-chart-5 :chartData="datesAndNumberOfNotesListForChart(5)" />
          </chart-container>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <note-item
          v-for="(note, index) in sortedNotesListByImportance"
          :note="note"
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
import ChartContainer from "./ChartContainer";
import LineChart4 from "./LineChart4";
import LineChart5 from "./LineChart5";

import { bus } from "../main";
import { useNotesStore } from "../stores/notes";
import { mapState, mapActions } from "pinia";

import DatePatterns from "../constants/date-patterns";

export default {
  name: "NotesContainer",
  components: {
    NoteItem,
    AddNoteForm,
    ChartContainer,
    LineChart4,
    LineChart5,
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
      chartTitle: "Notes chart by date",
      chartSubtitleText: "notes/day",
    };
  },
  methods: {
    ...mapActions(useNotesStore, ["fetchNotesList"]),

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
        noteDateCreated: this.$dayjs().format(
          DatePatterns.API_DATE_TIME_PATTERN
        ),
        isHighImportance: Boolean(isHighImportance),
        keywords: keywordsList,
      });

      this.resetForm();
    },

    createNumberOfNotesPerDayObject(list) {
      const numberOfNotesPerDay = {};
      list.forEach((date) => {
        numberOfNotesPerDay[date]
          ? numberOfNotesPerDay[date]++
          : (numberOfNotesPerDay[date] = 1);
      });
      return numberOfNotesPerDay;
    },

    sortAscendingByProperty(datesList, key) {
      datesList.sort((a, b) => a[key] - b[key]);
    },

    datesAndNumberOfNotesListForChart(chartVersion) {
      const listOfDatesAndValues = [];
      const numberOfNotesPerDay = this.createNumberOfNotesPerDayObject(
        this.notesListDates
      );

      Object.entries(numberOfNotesPerDay).forEach((keyValueArray) => {
        const date = keyValueArray[0];
        const numberOfNotes = keyValueArray[1];
        listOfDatesAndValues.push({
          date:
            chartVersion === 5
              ? this.$dayjs(date, DatePatterns.YEAR_MONTH_DAY_PATTERN).valueOf()
              : this.$dayjs(date, DatePatterns.YEAR_MONTH_DAY_PATTERN).toDate(),
          value: numberOfNotes,
        });
      });

      this.sortAscendingByProperty(listOfDatesAndValues, "date");

      return listOfDatesAndValues;
    },
  },
  computed: {
    ...mapState(useNotesStore, ["notesList", "sortedNotesListByImportance"]),

    notesListDates() {
      return this.notesList.map((note) =>
        this.$dayjs(note.noteDateCreated, DatePatterns.API_DATE_PATTERN).format(
          DatePatterns.YEAR_MONTH_DAY_PATTERN
        )
      );
    },
  },

  created() {
    try {
      this.isLoading = true;
      this.fetchNotesList();
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
