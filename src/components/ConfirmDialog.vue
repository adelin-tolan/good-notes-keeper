<template>
  <v-dialog max-width="300px" v-model="show">
    <v-card class="py-6">
      <v-card-text class="font-weight-medium">
        {{ confirmationQuestionText }}
      </v-card-text>
      <v-card-actions class="px-6 pt-1 pb-0">
        <v-spacer></v-spacer>
        <v-btn small @click="handleCancelBtn">Cancel</v-btn>
        <v-btn small color="success" @click="handleConfirmBtn">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    confirmationQuestionText: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleCancelBtn() {
      this.$emit("on-click-cancel-confirm-dialog");
    },
    handleConfirmBtn() {
      this.$emit("on-click-confirm-dialog");
    },
  },
  computed: {
    show: {
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
