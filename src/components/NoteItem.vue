<template>
  <v-col cols="12" sm="6" class="d-flex align-stretch">
    <v-card style="width: 100%" elevation="2" outlined>
      <v-card-text>
        <p class="text-h6 text--primary">{{ noteTitle }}</p>
        <div class="text--primary">
          {{ noteContent }}
        </div>
        <div>
          <span>{{ noteAuthor }}</span>
          <span>{{ noteDateCreated }}</span>
          <span>
            <v-icon v-if="isHighImportance"> mdi-file-alert </v-icon>
            <v-icon v-else> mdi-file </v-icon>
          </span>
          <span v-if="joinedKeywords">Keywords: {{ joinedKeywords }}.</span>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "NoteItem",
  props: {
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
  },

  computed: {
    joinedKeywords() {
      return this.keywords.join(", ");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card__text {
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
