<template>
  <div>
    <v-form ref="form" v-model="isFormValid">
      <v-row>
        <v-col cols="12" sm="6" class="d-flex flex-column">
          <v-text-field
            v-model="title"
            :rules="titleRules"
            :counter="20"
            :label="$t('message.form.title')"
            required
          ></v-text-field>

          <v-select
            v-model="author"
            :rules="authorRules"
            :items="authorsList"
            :label="$t('message.form.author')"
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea
            v-model="content"
            :rules="contentRules"
            :counter="200"
            clearable
            clear-icon="mdi-close-circle"
            :label="$t('message.form.content')"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-radio-group v-model="isHighImportance">
            <div>{{ $t("message.form.texts.noteImportanceText") }}</div>
            <v-radio
              value="1"
              :label="$t(`message.form.radioButtons.trueValue`)"
            >
            </v-radio>
            <v-radio
              value=""
              :label="$t('message.form.radioButtons.falseValue')"
            >
            </v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="6">
          <div>{{ $t("message.form.texts.addKeywordsText") }}</div>
          <v-text-field
            v-model="keyword"
            :rules="keywordsRules"
            :counter="15"
            label="Keyword"
            required
          ></v-text-field>
          <v-btn
            class="mr-4 text-lowercase"
            @click.prevent="handleNewKeywordAdd"
            :disabled="isAddNewKeywordButtonDisabled"
          >
            {{ $t("message.form.buttons.addNewKeyword") }}
          </v-btn>
          <div v-if="keywordsListString !== ''" class="mt-3">
            {{ $t("message.form.texts.keywordsAddedText") }}
            {{ keywordsListString }}.
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-6"></v-divider>

      <v-btn
        class="mr-4"
        @click.prevent="handleNewNoteAdd"
        :disabled="!isFormValid"
      >
        <strong>{{ $t("message.form.buttons.submit") }}</strong>
      </v-btn>
      <v-btn @click="handleFormReset">
        <strong> {{ $t("message.form.buttons.clear") }} </strong>
      </v-btn>
    </v-form>

    <v-overlay :value="isLoading">
      <v-progress-circular
        indeterminate
        color="green"
        size="50"
        width="8"
      ></v-progress-circular>
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
        (v) => v.length >= 3 || "Minimum length for title is 3 characters",
        (v) => v.length <= 20 || "Maximum length for title is 20 characters",
      ],
      contentRules: [
        (v) => v.length >= 10 || "Minimum length for content is 10 characters",
        (v) =>
          v.length <= 200 || "Maximum length for content is 200 characters",
      ],
      authorRules: [(v) => !!v || "You must choose a name from the list"],
    };
  },

  methods: {
    handleFormReset() {
      this.title = "";
      this.content = "";
      this.author = "";
      this.isHighImportance = "";
      this.keywordsList = [];
    },

    handleNewNoteAdd() {
      if (this.$refs.form.validate()) {
        this.$emit(
          "on-submit-button-click",
          this.title,
          this.content,
          this.author,
          this.isHighImportance,
          this.keywordsList
        );
        this.handleFormReset();
      }
    },
    handleNewKeywordAdd() {
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

  computed: {
    keywordsListString() {
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
      bus.$emit("api_success", "The initial name list has been loaded");
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
