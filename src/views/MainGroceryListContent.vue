<template>
  <div>
    <v-row>
      <v-col class="pl-md-9 pr-md-3 px-9" cols="12" md="6">
        <chart-container
          :subtitle="textContainingGroceriesNumber"
          :title="chartTitle"
        >
          <donut-chart-4 :chart-data="numberOfProductsPerCategoryList" />
        </chart-container>
      </v-col>
      <v-col class="pr-md-9 pl-md-3 px-9" cols="12" md="6">
        <chart-container
          :subtitle="textContainingGroceriesNumber"
          :title="chartTitle"
        >
          <donut-chart-5 :chart-data="numberOfProductsPerCategoryList" />
        </chart-container>
      </v-col>
    </v-row>

    <v-data-table
      class="elevation-1 my-6 mx-6"
      :headers="headers"
      :item-class="addClassToPurchasedProductsTableRows"
      :items="groceryList"
      :items-per-page="10"
    >
      <template #[`item.name`]="{ item }">
        <router-link
          :to="{ name: 'Grocery Item', params: { groceryItemId: item.id } }"
        >
          {{ item.name }}
        </router-link>
      </template>

      <template #[`item.isPurchased`]="{ item }">
        <v-checkbox
          v-model="item.isPurchased"
          :disabled="item.isPurchased"
          @click.native.capture="handleConfirmationDialogOpen($event, item)"
        />
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          class="green--text"
          :disabled="item.isPurchased"
          @click="handleEditProduct(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>

    <edit-grocery-list-dialog
      v-if="isEditGroceryDialogOpen"
      v-model="isEditGroceryDialogOpen"
      :grocery="productToEdit"
      @on-cancel-button-click="handleDialogClose"
      @on-save-button-click="handleDialogSave"
    />

    <confirmation-dialog
      v-if="isConfirmationDialogOpen"
      v-model="isConfirmationDialogOpen"
      :confirmation-question="confirmationQuestion"
      @on-cancel-button-click="handleConfirmationCancel"
      @on-confirm-button-click="handleConfirmationApprove"
    />
  </div>
</template>

<script>
import EditGroceryListDialog from "../components/EditGroceryListDialog";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ChartContainer from "../components/ChartContainer";
import DonutChart4 from "../components/DonutChart4";
import DonutChart5 from "../components/DonutChart5";

import { bus } from "../main";

import { useGroceryStore } from "../stores/grocery";
import { mapState, mapActions } from "pinia";

export default {
  name: "MainGroceryListContent",
  components: {
    EditGroceryListDialog,
    ConfirmationDialog,
    ChartContainer,
    DonutChart4,
    DonutChart5,
  },

  data() {
    return {
      headers: [
        {
          text: this.$t("tableHeaders.product"),
          align: "start",
          value: "name",
        },
        {
          text: this.$t("tableHeaders.quantity"),
          value: "quantity",
        },
        {
          text: this.$t("tableHeaders.unit"),
          value: "unitMeasure",
        },
        {
          text: this.$t("tableHeaders.category"),
          value: "category",
        },
        {
          text: this.$t("tableHeaders.purchased"),
          value: "isPurchased",
        },
        { text: this.$t("tableHeaders.actions"), value: "actions" },
      ],
      isEditGroceryDialogOpen: false,
      isConfirmationDialogOpen: false,
      productToEdit: {},
      indexOfProductToEdit: null,
      chartTitle: this.$t("titles.groceryChartTitle"),
      confirmationQuestion: this.$t("labels.confirmationQuestion"),
    };
  },

  computed: {
    ...mapState(useGroceryStore, ["groceryList"]),

    numberOfProductsPerCategoryObject() {
      const numberOfProductsPerCategory = {};
      this.groceryList.forEach((product) =>
        numberOfProductsPerCategory[product.category]
          ? numberOfProductsPerCategory[product.category]++
          : (numberOfProductsPerCategory[product.category] = 1)
      );
      return numberOfProductsPerCategory;
    },

    numberOfProductsPerCategoryList() {
      const listOfCategoriesAndValues = [];
      Object.entries(this.numberOfProductsPerCategoryObject).forEach(
        (categoryValueArray) => {
          const category = categoryValueArray[0];
          const numberOfProducts = categoryValueArray[1];
          listOfCategoriesAndValues.push({
            category: category,
            value: numberOfProducts,
          });
        }
      );
      return listOfCategoriesAndValues;
    },

    textContainingGroceriesNumber() {
      return this.$t("titles.groceryChartSubtitle", {
        groceriesNumber: this.groceryList.length,
      });
    },
  },

  created() {
    try {
      this.fetchGroceryList();
      bus.$emit(
        "api_success",
        this.$t("eventMessages.initialListLoaded", { listName: "grocery" })
      );
    } catch (err) {
      console.error(err);
      bus.$emit("api_error", err.message);
    }
  },

  methods: {
    ...mapActions(useGroceryStore, ["fetchGroceryList"]),

    handleEditProduct(product) {
      this.indexOfProductToEdit = this.groceryList.indexOf(product);
      this.productToEdit = { ...product };
      this.isEditGroceryDialogOpen = true;
    },

    handleDialogClose() {
      this.isEditGroceryDialogOpen = false;
    },

    handleDialogSave(newProductValues) {
      newProductValues.id = this.productToEdit.id;
      newProductValues.category = this.productToEdit.category;

      this.groceryList.splice(this.indexOfProductToEdit, 1, newProductValues);
      this.isEditGroceryDialogOpen = false;
    },

    handleConfirmationDialogOpen(event, product) {
      event.stopPropagation();
      if (!product.isPurchased) {
        this.indexOfProductToEdit = product.id;
        this.isConfirmationDialogOpen = true;
      }
    },

    handleConfirmationCancel() {
      this.isConfirmationDialogOpen = false;
    },

    handleConfirmationApprove() {
      this.groceryList.find(
        (product) => product.id === this.indexOfProductToEdit
      ).isPurchased = true;
      this.isConfirmationDialogOpen = false;
    },

    addClassToPurchasedProductsTableRows(product) {
      if (product.isPurchased) {
        return "purchased-style";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  thead th {
    background: green;
    &:first-child {
      border-radius: 5px 0 0;
    }
    &:last-child {
      border-radius: 0 5px 0 0;
    }

    span {
      color: white;
    }
  }

  .purchased-style {
    background: #f7f7f7;
  }
}
</style>
