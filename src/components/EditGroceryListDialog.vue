<template>
  <v-dialog persistent max-width="600px" v-model="show">
    <v-card>
      <v-toolbar style="background: rgb(0, 69, 124)" dark>{{
        $t("message.table.editTabelDialog.title")
      }}</v-toolbar>
      <v-card-text>
        <v-container>
          <v-row class="mt-4">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :label="$t('message.table.header.product')"
                v-model="productName"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :label="$t('message.table.header.quantity')"
                v-model="productQuantity"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :label="$t('message.table.header.unit')"
                v-model="productUnitMeasure"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4"> </v-col>
            <v-col cols="12" sm="6" md="4"> </v-col>
            <v-col cols="12" sm="6" md="4" class="d-flex align-end">
              <v-btn
                outlined
                text
                class="rounded-0 py-5"
                @click="handleCloseBtn"
              >
                Cancel
              </v-btn>
              <v-btn
                outlined
                text
                class="ml-2 rounded-0 py-5"
                @click="handleSaveBtn"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditGroceryListDialog",
  props: {
    isDialogOpen: {
      type: Boolean,
      required: true,
    },
    groceryFieldsToEdit: {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unitMeasure: {
        type: String,
        required: true,
      },
    },

    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      productName: "",
      productQuantity: "",
      productUnitMeasure: "",
    };
  },
  methods: {
    handleCloseBtn() {
      this.$emit("on-click-dialog-close");
    },
    handleSaveBtn() {
      this.$emit("on-click-dialog-save", {
        name: this.productName,
        quantity: this.productQuantity,
        unitMeasure: this.productUnitMeasure,
      });
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
  created() {
    this.productName = this.groceryFieldsToEdit.name;
    this.productQuantity = this.groceryFieldsToEdit.quantity;
    this.productUnitMeasure = this.groceryFieldsToEdit.unitMeasure;
  },
};
</script>

<style lang="scss" scoped>
.v-btn--outlined {
  border: 2px solid #43a047 !important;
  text-transform: capitalize;
}
</style>
