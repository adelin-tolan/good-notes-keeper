<template>
  <v-dialog max-width="300px" v-model="isDialogOpen">
    <v-card class="py-6">
      <v-card-text class="font-weight-medium">
        {{ confirmationQuestion }}
      </v-card-text>
      <v-card-actions class="px-6 pt-1 pb-0">
        <v-spacer></v-spacer>
        <v-btn small @click="handleClickOnCancelButton">Cancel</v-btn>
        <v-btn small color="success" @click="handleClickOnConfirmButton"
          >Confirm</v-btn
        >
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
  methods: {
    handleClickOnCancelButton() {
      this.$emit("on-cancel-button-click");
    },
    handleClickOnConfirmButton() {
      this.$emit("on-confirm-button-click");
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
};
</script>
