<template>
  <div>
    <v-row class="mt-7">
      <v-col class="pl-md-3 pr-md-3 px-3" cols="12" md="6">
        <chart-container :subtitle="textContainingGroceriesNumber" :title="chartTitle">
          <donut-chart-4 :chart-data="numberOfGroceriesPerCategoryList" />
        </chart-container>
      </v-col>
      <v-col class="pr-md-3 pl-md-3 px-3" cols="12" md="6">
        <chart-container :subtitle="textContainingGroceriesNumber" :title="chartTitle">
          <donut-chart-5 :chart-data="numberOfGroceriesPerCategoryList" />
        </chart-container>
      </v-col>
    </v-row>

    <edit-grocery-list-dialog
      v-if="isEditGroceryDialogOpen"
      v-model="isEditGroceryDialogOpen"
      :grocery="groceryToEdit"
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

    <ag-grid-vue
      class="ag-theme-alpine table-dimensions mt-13 mb-6"
      :column-defs="columnDefs"
      :context="context"
      :default-col-def="defaultColDef"
      :get-row-class="getRowClass"
      :pagination="true"
      :pagination-auto-page-size="true"
      :row-data="groceryList"
      @first-data-rendered="onFirstDataRendered"
      @grid-ready="onGridReady"
      @grid-size-changed="onGridSizeChanged"
    />
  </div>
</template>

<script>
import EditGroceryListDialog from "../components/EditGroceryListDialog";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ChartContainer from "../components/ChartContainer";
import DonutChart4 from "../components/DonutChart4";
import DonutChart5 from "../components/DonutChart5";
import { AgGridVue } from "ag-grid-vue";
import PurchasedCellRenderer from "../components/PurchasedCellRenderer";
import ActionCellRenderer from "../components/ActionCellRenderer";
import NameCellRenderer from "../components/NameCellRenderer";
import PurchasedFloatingFilter from "../components/PurchasedFloatingFilter";

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
    AgGridVue,
    PurchasedCellRenderer,
    ActionCellRenderer,
    NameCellRenderer,
    PurchasedFloatingFilter,
  },

  data() {
    return {
      isEditGroceryDialogOpen: false,
      isConfirmationDialogOpen: false,
      groceryToEdit: {},
      indexOfGroceryToEdit: null,
      chartTitle: this.$t("titles.groceryChartTitle"),
      confirmationQuestion: this.$t("labels.confirmationQuestion"),

      columnDefs: null,
      gridApi: null,
      context: {},
      getRowClass: null,
      defaultColDef: null,
    };
  },

  computed: {
    ...mapState(useGroceryStore, ["groceryList"]),

    numberOfGroceriesPerCategoryObject() {
      const numberOfGroceriesPerCategory = {};
      this.groceryList.forEach((grocery) =>
        numberOfGroceriesPerCategory[grocery.category]
          ? numberOfGroceriesPerCategory[grocery.category]++
          : (numberOfGroceriesPerCategory[grocery.category] = 1)
      );
      return numberOfGroceriesPerCategory;
    },

    numberOfGroceriesPerCategoryList() {
      const listOfCategoriesAndValues = [];
      Object.entries(this.numberOfGroceriesPerCategoryObject).forEach(
        (categoryValueArray) => {
          const category = categoryValueArray[0];
          const numberOfGroceries = categoryValueArray[1];
          listOfCategoriesAndValues.push({
            category: category,
            value: numberOfGroceries,
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
        this.$t("eventMessages.initialListLoaded", {
          listName: "grocery",
        })
      );
    } catch (err) {
      console.error(err);
      bus.$emit("api_error", err.message);
    }
  },

  beforeMount() {
    this.columnDefs = [
      {
        headerName: this.$t("tableHeaders.grocery"),
        field: "name",
        minWidth: 140,
        cellRenderer: "NameCellRenderer",
      },
      {
        headerName: this.$t("tableHeaders.quantity"),
        field: "quantity",
        minWidth: 110,
        maxWidth: 140,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: this.$t("tableHeaders.unit"),
        field: "unitMeasure",
        minWidth: 100,
        maxWidth: 120,
      },
      {
        headerName: this.$t("tableHeaders.category"),
        field: "category",
        minWidth: 140,
      },
      {
        headerName: this.$t("tableHeaders.purchased"),
        field: "isPurchased",
        minWidth: 150,
        maxWidth: 150,
        cellRenderer: "PurchasedCellRenderer",
        suppressMenu: true,
        floatingFilterComponent: "PurchasedFloatingFilter",
        floatingFilterComponentParams: { suppressFilterButton: true },
      },
      {
        headerName: this.$t("tableHeaders.actions"),
        field: "actions",
        sortable: false,
        filter: false,
        minWidth: 90,
        maxWidth: 120,
        cellRenderer: "ActionCellRenderer",
      },
    ];

    this.defaultColDef = {
      sortable: true,
      filter: true,
      floatingFilter: true,
    };

    this.context = { componentParent: this };

    this.getRowClass = (params) => {
      return params.data.isPurchased
        ? "purchased-grocery-row-style"
        : "unpurchased-grocery-row-style";
    };
  },

  methods: {
    ...mapActions(useGroceryStore, ["fetchGroceryList"]),

    handleDialogClose() {
      this.isEditGroceryDialogOpen = false;
    },

    handleDialogSave(newGroceryValues) {
      newGroceryValues.id = this.groceryToEdit.id;
      newGroceryValues.category = this.groceryToEdit.category;
      newGroceryValues.isPurchased = this.groceryToEdit.isPurchased;

      this.groceryList.splice(this.indexOfGroceryToEdit, 1, newGroceryValues);
      this.isEditGroceryDialogOpen = false;
    },

    handleConfirmationCancel() {
      this.isConfirmationDialogOpen = false;
    },

    handleConfirmationApprove() {
      this.groceryList.find(
        (grocery) => grocery.id === this.indexOfGroceryToEdit
      ).isPurchased = true;
      this.isConfirmationDialogOpen = false;
      this.gridApi.redrawRows();
      this.gridApi.refreshClientSideRowModel("filter");
    },

    onGridReady(params) {
      this.gridApi = params.api;
    },

    getGroceryIdAndOpenConfirmationDialog(id) {
      this.indexOfGroceryToEdit = id;
      this.isConfirmationDialogOpen = true;
    },

    getGroceryToEdit(grocery) {
      this.indexOfGroceryToEdit = this.groceryList.indexOf(grocery);
      this.groceryToEdit = {
        ...grocery,
      };
      this.isEditGroceryDialogOpen = true;
    },

    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
    },

    onGridSizeChanged(params) {
      params.api.sizeColumnsToFit();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-alpine.css";

.table-dimensions {
  width: 100%;
  height: 584px;
}
::v-deep {
  .purchased-grocery-row-style {
    background: #f7f7f7;
  }

  .unpurchased-grocery-row-style {
    background: #fff;
  }

  .ag-row-hover {
    background: #f0f0f0;
  }

  [col-id="isPurchased"] .ag-header-icon {
    display: none;
  }
}
</style>
