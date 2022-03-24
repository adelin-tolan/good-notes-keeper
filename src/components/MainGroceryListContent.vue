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
        <v-icon class="green--text" @click="handleEditItem(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>

    <edit-grocery-list-dialog
      v-if="isDialogOpen"
      v-model="isDialogOpen"
      :propsObj="itemToEdit"
      @on-click-dialog-close="handleDialogClose"
      @on-click-dialog-save="handleDialogSave"
    />
  </div>
</template>

<script>
import EditGroceryListDialog from "./EditGroceryListDialog.vue";

export default {
  name: "MainGroceryListContent",
  components: {
    EditGroceryListDialog,
  },
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
    handleEditItem(item) {
      this.indexOfElToEdit = this.groceryList.indexOf(item);
      this.itemToEdit = { ...item };
      this.isDialogOpen = true;
    },
    handleDialogClose() {
      this.isDialogOpen = false;
    },

    handleDialogSave(newProdValues) {
      newProdValues.id = this.itemToEdit.id;
      this.groceryList.splice(this.indexOfElToEdit, 1, newProdValues);
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
