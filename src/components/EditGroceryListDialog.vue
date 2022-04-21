<template>
  <v-dialog persistent max-width="600px" v-model="isDialogOpen">
    <v-card>
      <v-toolbar style="background: rgb(0, 69, 124)" dark>{{
        $t("dialog.groceryEditTitle")
      }}</v-toolbar>
      <v-card-text>
        <v-container>
          <v-row class="mt-4">
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="name" :label="$t('tableHeaders.product')">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="quantity"
                :label="$t('tableHeaders.quantity')"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="unitMeasure"
                :label="$t('tableHeaders.unit')"
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
                @click="handleClickOnCancelButton"
              >
                {{ $t("buttons.cancel") }}
              </v-btn>
              <v-btn
                outlined
                text
                class="ml-2 rounded-0 py-5"
                @click="handleClickOnSaveButton"
              >
                {{ $t("buttons.save") }}
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
    grocery: {
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
      name: "",
      quantity: "",
      unitMeasure: "",
    };
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

  created() {
    this.name = this.grocery.name;
    this.quantity = this.grocery.quantity;
    this.unitMeasure = this.grocery.unitMeasure;
  },

  methods: {
    handleClickOnCancelButton() {
      this.$emit("on-cancel-button-click");
    },
    handleClickOnSaveButton() {
      this.$emit("on-save-button-click", {
        name: this.name,
        quantity: this.quantity,
        unitMeasure: this.unitMeasure,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn--outlined {
  border: 2px solid #43a047 !important;
  text-transform: capitalize;
}
</style>
