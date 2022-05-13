<template>
  <v-dialog v-model="isDialogOpen" max-width="600px" persistent>
    <v-card>
      <v-toolbar color="rgb(0, 69, 124)" dark>
        {{ $t("titles.groceryEditTitle") }}
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row class="mt-4">
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="name"
                :label="$t('tableHeaders.product')"
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="quantity"
                :label="$t('tableHeaders.quantity')"
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="unitMeasure"
                :label="$t('tableHeaders.unit')"
              />
            </v-col>
            <v-col cols="12" md="4" sm="6" />
            <v-col cols="12" md="4" sm="6" />
            <v-col class="d-flex align-end" cols="12" md="4" sm="6">
              <v-btn
                class="rounded-0 py-5"
                outlined
                text
                @click="handleClickOnCancelButton"
              >
                {{ $t("buttons.cancel") }}
              </v-btn>
              <v-btn
                class="ml-2 rounded-0 py-5"
                outlined
                text
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
      type: Object,
      required: true,
      default() {
        return {
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
        };
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
.theme--light.v-btn.v-btn--outlined.v-btn--text {
  border: 2px solid #43a047;
  text-transform: capitalize;
}
</style>
