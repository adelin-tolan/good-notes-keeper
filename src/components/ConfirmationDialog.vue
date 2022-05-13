<template>
  <v-dialog v-model="isDialogOpen" max-width="300px">
    <v-card class="py-6">
      <v-card-text class="font-weight-medium">
        {{ confirmationQuestion }}
      </v-card-text>
      <v-card-actions class="px-6 pt-1 pb-0">
        <v-spacer />
        <v-btn small @click="handleClickOnCancelButton">
          {{
            $t("buttons.cancel")
          }}
        </v-btn>
        <v-btn color="success" small @click="handleClickOnConfirmButton">
          {{
            $t("buttons.confirm")
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmationDialog",
  props: {
    confirmationQuestion: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    isDialogOpen: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  methods: {
    handleClickOnCancelButton() {
      this.$emit("on-cancel-button-click");
    },
    handleClickOnConfirmButton() {
      this.$emit("on-confirm-button-click");
    },
  },
};
</script>
