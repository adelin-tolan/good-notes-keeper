<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="pl-md-3 pr-md-3 px-3" cols="12" md="6">
          <chart-container :subtitle="chartSubtitle" :title="chartTitle">
            <line-chart-4 :chart-data="datesAndNumberOfNotesPerDayList(4)" />
          </chart-container>
        </v-col>
        <v-col class="pr-md-3 pl-md-3 px-3" cols="12" md="6">
          <chart-container :subtitle="chartSubtitle" :title="chartTitle">
            <line-chart-5 :chart-data="datesAndNumberOfNotesPerDayList(5)" />
          </chart-container>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <note-item
          v-for="(note, index) in sortedNotesListByImportance"
          :key="index"
          :note="note"
        />
      </v-row>

      <v-btn class="my-6" color="success" dark @click="toggleFormVisibility">
        {{ isFormVisible ? $t("buttons.hideForm") : $t("buttons.addNote") }}
      </v-btn>

      <add-note-form
        v-if="isFormVisible"
        @on-add-new-keyword-button-click="handleNewKeywordSubmit"
        @on-clear-button-click="handleFormReset"
        @on-submit-button-click="handleFormSubmit"
      />

      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64" />
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
import ConvertDateUtils from "../utils/convert-date-utils";

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
      isFormVisible: false,
      noteTitle: "",
      noteContent: "",
      noteAuthor: "",
      isHighImportance: false,
      keywords: [],
      isLoading: false,
      chartTitle: this.$t("titles.notesChartTitle"),
      chartSubtitle: this.$t("titles.notesChartSubtitle"),
    };
  },

  computed: {
    ...mapState(useNotesStore, ["notesList", "sortedNotesListByImportance"]),

    notesDatesList() {
      return this.notesList.map((note) =>
        ConvertDateUtils.formatDate(
          DatePatterns.YEAR_MONTH_DAY_PATTERN,
          DatePatterns.API_DATE_PATTERN,
          note.noteDateCreated
        )
      );
    },
  },

  created() {
    try {
      this.isLoading = true;
      this.fetchNotesList();
      bus.$emit(
        "api_success",
        this.$t("eventMessages.initialListLoaded", { listName: "notes" })
      );
    } catch (err) {
      console.error(err);
      bus.$emit("api_error", err.message);
    } finally {
      setTimeout(() => {
        this.isLoading = false;
      }, 0);
    }
  },

  methods: {
    ...mapActions(useNotesStore, ["fetchNotesList"]),

    toggleFormVisibility() {
      this.isFormVisible = !this.isFormVisible;
    },

    handleNewKeywordSubmit(keyword) {
      this.keywords.push(keyword);
    },

    handleFormReset() {
      this.noteTitle = "";
      this.noteContent = "";
      this.noteAuthor = "";
      this.isHighImportance = "";
      this.keywords = [];
    },

    handleFormSubmit(title, content, author, isHighImportance, keywordsList) {
      this.notesList.push({
        noteTitle: title || "empty",
        noteContent: content || "empty",
        noteAuthor: author || "empty",
        noteDateCreated: ConvertDateUtils.formatDate(
          DatePatterns.API_DATE_TIME_PATTERN
        ),
        isHighImportance: Boolean(isHighImportance),
        keywords: keywordsList,
      });

      this.handleFormReset();
    },

    getNumberOfNotesPerDayObject(listOfDatesOnWhichNotesWerePosted) {
      const numberOfNotesPerDay = {};
      listOfDatesOnWhichNotesWerePosted.forEach((date) => {
        numberOfNotesPerDay[date]
          ? numberOfNotesPerDay[date]++
          : (numberOfNotesPerDay[date] = 1);
      });
      return numberOfNotesPerDay;
    },

    sortAscendingByProperty(datesList, key) {
      datesList.sort((a, b) => a[key] - b[key]);
    },

    datesAndNumberOfNotesPerDayList(chartVersion) {
      const datesAndValuesList = [];
      const numberOfNotesPerDay = this.getNumberOfNotesPerDayObject(
        this.notesDatesList
      );

      Object.entries(numberOfNotesPerDay).forEach((keyValueArray) => {
        const date = keyValueArray[0];
        const numberOfNotes = keyValueArray[1];
        datesAndValuesList.push({
          date:
            chartVersion === 5
              ? ConvertDateUtils.convertDateToUnixTimestamp(
                  date,
                  DatePatterns.YEAR_MONTH_DAY_PATTERN
                )
              : ConvertDateUtils.convertToNativeDateObject(
                  date,
                  DatePatterns.YEAR_MONTH_DAY_PATTERN
                ),
          value: numberOfNotes,
        });
      });

      this.sortAscendingByProperty(datesAndValuesList, "date");

      return datesAndValuesList;
    },
  },
};
</script>
