<template>
  <v-col class="d-flex align-stretch" cols="12" sm="6">
    <v-card elevation="2" outlined width="100%">
      <v-card-text>
        <div class="text-h6 text--primary">
          {{ note.noteTitle }}
        </div>
        <div class="text--primary">
          {{ note.noteContent }}
        </div>
        <div>
          <span>{{ note.noteAuthor }}</span>
          <span>{{
            parseDateFromApiToNoteItemPattern(note.noteDateCreated)
          }}</span>
          <span>
            <v-icon v-if="note.isHighImportance"> mdi-file-alert </v-icon>
            <v-icon v-else> mdi-file </v-icon>
          </span>
          <span v-if="keywordsString">
            {{ $t("labels.keywords") }}: {{ keywordsString }}.
          </span>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import ConvertDateUtils from "../utils/convert-date-utils";
import DatePatterns from "../constants/date-patterns";

export default {
  name: "NoteItem",
  props: {
    note: {
      type: Object,
      required: true,
      default() {
        return {
          noteTitle: {
            type: String,
            required: true,
          },
          noteContent: {
            type: String,
            required: true,
          },
          noteAuthor: {
            type: String,
            required: true,
          },
          noteDateCreated: {
            type: String,
            required: true,
          },
          isHighImportance: {
            type: Boolean,
            required: true,
          },
          keywords: {
            type: Array,
            required: true,
          },
        };
      },
    },
  },

  computed: {
    keywordsString() {
      return this.note.keywords.join(", ");
    },
  },

  methods: {
    parseDateFromApiToNoteItemPattern(date) {
      return ConvertDateUtils.formatDate(
        DatePatterns.NOTE_ITEM_DATE_TIME_PATTERN,
        DatePatterns.API_DATE_TIME_PATTERN,
        date
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.theme--light.v-application {
  .text-h6 {
    &:hover {
      color: rgba(0, 0, 0, 0.6) !important;
    }
  }
  span {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
