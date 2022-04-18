<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" class="pl-md-9 pr-md-3 px-9">
        <chart-container
          :title="chartTitle"
          :subtitle="groceriesNumberTextForChart"
        >
          <donut-chart-4 :chartData="categoriesAndValuesListForChart" />
        </chart-container>
      </v-col>
      <v-col cols="12" md="6" class="pr-md-9 pl-md-3 px-9">
        <chart-container
          :title="chartTitle"
          :subtitle="groceriesNumberTextForChart"
        >
          <donut-chart-5 :chartData="categoriesAndValuesListForChart" />
        </chart-container>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="groceryList"
      :items-per-page="10"
      :item-class="addStyleToPurchasedProducts"
      class="elevation-1 my-6 mx-6"
    >
      <template #[`item.name`]="{ item }">
        <router-link
          :to="{ name: 'Grocery Item', params: { groceryItemId: item.id } }"
          >{{ item.name }}
        </router-link>
      </template>

      <template #[`item.isPurchased`]="{ item }">
        <v-checkbox
          v-model="item.isPurchased"
          @click.native.capture="handleChangeIsPurchased($event, item)"
          :disabled="item.isPurchased"
        >
        </v-checkbox>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          class="green--text"
          @click="handleEditProduct(item)"
          :disabled="item.isPurchased"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>

    <edit-grocery-list-dialog
      v-if="isDialogOpen"
      v-model="isDialogOpen"
      :groceryFieldsToEdit="productToEdit"
      @on-click-dialog-close="handleDialogClose"
      @on-click-dialog-save="handleDialogSave"
    />

    <confirm-dialog
      v-if="isPurchasedConfirmOpen"
      v-model="isPurchasedConfirmOpen"
      :confirmation-question-text="confirmDialogText"
      @on-click-cancel-confirm-dialog="handlePurchasedConfirmCancel"
      @on-click-confirm-dialog="handlePurchasedConfirm"
    />
  </div>
</template>

<script>
import EditGroceryListDialog from "../components/EditGroceryListDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import ChartContainer from "../components/ChartContainer";
import DonutChart4 from "../components/DonutChart4";
import DonutChart5 from "../components/DonutChart5";

import { useGroceryStore } from "../stores/grocery";
import { mapState, mapActions } from "pinia";

export default {
  name: "MainGroceryListContent",
  components: {
    EditGroceryListDialog,
    ConfirmDialog,
    ChartContainer,
    DonutChart4,
    DonutChart5,
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
          text: this.$t("message.table.header.category"),
          value: "category",
        },
        {
          text: this.$t("message.table.header.purchased"),
          value: "isPurchased",
        },
        { text: this.$t("message.table.header.actions"), value: "actions" },
      ],
      isDialogOpen: false,
      isPurchasedConfirmOpen: false,
      productToEdit: {},
      indexOfProductToEdit: null,
      chartTitle: "Groceries category",
      confirmDialogText: "Are you sure you bought this product?",
    };
  },

  methods: {
    ...mapActions(useGroceryStore, ["fetchGroceryList"]),

    handleEditProduct(product) {
      this.indexOfProductToEdit = this.groceryList.indexOf(product);
      this.productToEdit = { ...product };
      this.isDialogOpen = true;
    },

    handleDialogClose() {
      this.isDialogOpen = false;
    },

    handleDialogSave(newProductValues) {
      newProductValues.id = this.productToEdit.id;
      newProductValues.category = this.productToEdit.category;

      this.groceryList.splice(this.indexOfProductToEdit, 1, newProductValues);
      this.isDialogOpen = false;
    },

    handleChangeIsPurchased(event, product) {
      event.stopPropagation();
      if (!product.isPurchased) {
        this.indexOfProductToEdit = product.id;
        this.isPurchasedConfirmOpen = true;
      }
    },

    handlePurchasedConfirmCancel() {
      this.isPurchasedConfirmOpen = false;
    },

    handlePurchasedConfirm() {
      this.groceryList.find(
        (product) => product.id === this.indexOfProductToEdit
      ).isPurchased = true;
      this.isPurchasedConfirmOpen = false;
    },

    addStyleToPurchasedProducts(product) {
      if (product.isPurchased) {
        return "purchased-style";
      }
    },
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
      console.log(numberOfProductsPerCategory);
      return numberOfProductsPerCategory;
    },

    categoriesAndValuesListForChart() {
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

    groceriesNumberTextForChart() {
      return `Total: ${this.groceryList.length} groceries`;
    },
  },

  created() {
    this.fetchGroceryList();
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
