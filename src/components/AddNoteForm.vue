<template>
  <div>
    <v-form ref="form" v-model="isFormValid">
      <v-row>
        <v-col class="d-flex flex-column" cols="12" sm="6">
          <v-text-field
            v-model="title"
            :counter="20"
            :label="$t('placeholders.title')"
            required
            :rules="titleRules"
          />

          <v-select
            v-model="author"
            dense
            :items="authorsList"
            :label="$t('placeholders.author')"
            :rules="authorRules"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea
            v-model="content"
            clear-icon="mdi-close-circle"
            clearable
            :counter="200"
            :label="$t('placeholders.content')"
            :rules="contentRules"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-radio-group v-model="isHighImportance">
            <div>{{ $t("labels.noteImportanceQuestion") }}</div>
            <v-radio :label="$t(`buttons.yes`)" value="1" />
            <v-radio :label="$t('buttons.no')" value="" />
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="6">
          <div>{{ $t("labels.requirementToAddKeywords") }}</div>
          <v-text-field
            v-model="keyword"
            :counter="15"
            :label="$t('placeholders.keyword')"
            required
            :rules="keywordsRules"
          />
          <v-btn
            class="mr-4 text-lowercase"
            :disabled="isAddNewKeywordButtonDisabled"
            @click.prevent="handleNewKeywordAddClick"
          >
            {{ $t("buttons.addNewKeyword") }}
          </v-btn>
          <div v-if="keywordsString !== ''" class="mt-3">
            {{ $t("labels.keywordsAdded") }}
            {{ keywordsString }}.
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-6" />

      <v-btn
        class="mr-4"
        :disabled="!isFormValid"
        @click.prevent="handleNewNoteAddClick"
      >
        <strong>{{ $t("buttons.submit") }}</strong>
      </v-btn>
      <v-btn @click="handleFormResetClick">
        <strong> {{ $t("buttons.clear") }} </strong>
      </v-btn>
    </v-form>

    <v-overlay :value="isLoading">
      <v-progress-circular color="green" indeterminate size="50" width="8" />
    </v-overlay>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  name: "AddNoteForm",
  data() {
    return {
      isFormValid: false,
      title: "",
      content: "",
      author: "",
      authorsList: [],
      isHighImportance: "",
      keyword: "",
      keywordsList: [],
      isLoading: false,
      titleRules: [
        (v) =>
          v.length >= 3 ||
          this.$t("rules.minimumLength", {
            minimumNumber: 3,
            fieldName: "title",
          }),
        (v) =>
          v.length <= 20 ||
          this.$t("rules.maximumLength", {
            maximumNumber: 20,
            fieldName: "title",
          }),
      ],
      contentRules: [
        (v) =>
          v.length >= 10 ||
          this.$t("rules.minimumLength", {
            minimumNumber: 10,
            fieldName: "content",
          }),
        (v) =>
          v.length <= 200 ||
          this.$t("rules.maximumLength", {
            maximumNumber: 200,
            fieldName: "content",
          }),
      ],
      authorRules: [(v) => !!v || this.$t("rules.requirementToChooseName")],
    };
  },

  computed: {
    keywordsString() {
      return this.keywordsList.join(", ");
    },
    isAddNewKeywordButtonDisabled() {
      if (this.keyword.length < 3 || this.keyword.length > 15) {
        return true;
      }
      return false;
    },
  },

  async created() {
    try {
      this.isLoading = true;
      const response = await fetch(
        "https://mocki.io/v1/91c1cd99-8fe0-4eb2-8b42-82c1f940eb01"
      );
      const fetchedAuthorsList = await response.json();
      this.authorsList = fetchedAuthorsList.map((author) => author.name);
      bus.$emit(
        "api_success",
        this.$t("eventMessages.initialListLoaded", { listName: "name" })
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
    handleFormResetClick() {
      this.title = "";
      this.content = "";
      this.author = "";
      this.isHighImportance = "";
      this.keywordsList = [];
    },

    handleNewNoteAddClick() {
      if (this.$refs.form.validate()) {
        this.$emit(
          "on-submit-button-click",
          this.title,
          this.content,
          this.author,
          this.isHighImportance,
          this.keywordsList
        );
        this.handleFormResetClick();
      }
    },
    handleNewKeywordAddClick() {
      if (this.keyword) {
        this.keywordsList.push(this.keyword);
        this.$emit("on-add-new-keyword-button-click", this.keyword);
        this.keyword = "";
      }
    },
    resetValues() {
      this.$emit("on-clear-button-click");
    },
  },
};
</script>
