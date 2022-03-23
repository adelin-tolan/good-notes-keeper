<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="groceryList"
      :items-per-page="10"
      class="elevation-1 my-6 mx-6"
    >
      <template #[`item.isPurchased`]="{ item }">
        <v-icon
          size="24px"
          :style="{ color: item.isPurchased ? 'green' : 'red' }"
        >
          mdi-{{ item.isPurchased ? "check" : "close" }}
        </v-icon>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon class="green--text" @click="handleFieldsEdit(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog
      v-model="isDialogOpen"
      persistent
      max-width="600px"
      v-if="isDialogOpen"
    >
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
                  v-model="itemToEdit.name"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :label="$t('message.table.header.quantity')"
                  v-model="itemToEdit.quantity"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :label="$t('message.table.header.unit')"
                  v-model="itemToEdit.unitMeasure"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-switch
                  v-model="itemToEdit.isPurchased"
                  :label="$t('message.table.editTabelDialog.purchased')"
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6" md="4"> </v-col>
              <v-col cols="12" sm="6" md="4" class="d-flex align-end">
                <v-btn
                  outlined
                  text
                  class="rounded-0 py-5"
                  @click="handleDialogClose"
                >
                  Cancel
                </v-btn>
                <v-btn
                  outlined
                  text
                  class="ml-2 rounded-0 py-5"
                  @click="handleDialogSave"
                >
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "MainGroceryListContent",
  data() {
    return {
      headers: [
        {
          text: this.$t("message.table.header.product"),
          align: "start",
          value: "name",
        },
        {
          text: this.$t("message.table.header.quantity"),
          value: "quantity",
        },
        {
          text: this.$t("message.table.header.unit"),
          value: "unitMeasure",
        },
        {
          text: this.$t("message.table.header.purchased"),
          value: "isPurchased",
        },
        { text: this.$t("message.table.header.actions"), value: "actions" },
      ],
      groceryList: [],
      isDialogOpen: false,
      itemToEdit: {},
      indexOfElToEdit: 0,
    };
  },
  methods: {
    handleFieldsEdit(item) {
      this.isDialogOpen = true;
      this.indexOfElToEdit = this.groceryList.indexOf(item);
      this.itemToEdit = { ...item };
    },
    handleDialogClose() {
      this.isDialogOpen = false;
    },
    handleDialogSave() {
      this.groceryList.splice(this.indexOfElToEdit, 1, {
        id: this.itemToEdit.id,
        name: this.itemToEdit.name,
        quantity: this.itemToEdit.quantity,
        unitMeasure: this.itemToEdit.unitMeasure,
        isPurchased: this.itemToEdit.isPurchased,
      });

      this.isDialogOpen = false;
    },
  },

  async created() {
    try {
      const response = await fetch(
        "https://mocki.io/v1/4a100cdb-3497-45d4-94b5-5c0e7cd951db"
      );
      this.groceryList = await response.json();
    } catch (err) {
      console.error(err);
    }
  },

  beforeUpdate: {},
};
</script>

<style scoped>
.v-btn--outlined {
  border: 2px solid #43a047 !important;
  text-transform: capitalize;
}
</style>
