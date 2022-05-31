<template>
  <v-select
    clearable
    hide-details="auto"
    item-text="text"
    item-value="value"
    :items="purchasedFieldFilterOptions"
    placeholder="Yes/No"
    solo
    @change="handleFilterChange($event)"
  />
</template>

<script>
export default {
  name: "PurchasedFloatingFilter",
  data() {
    return {
      purchasedFieldFilterOptions: [
        { text: "YES", value: true },
        { text: "NO", value: false },
      ],
      currentValue: null,
    };
  },

  methods: {
    handleFilterChange(event) {
      this.currentValue = event;
      this.params.parentFilterInstance((instance) => {
        instance.onFloatingFilterChanged("equals", this.currentValue);
      });
    },

    onParentModelChanged(parentModel) {
      if (!parentModel) {
        this.currentValue = "";
      } else {
        this.currentValue = parentModel.filter;
      }
    },
  },
};
</script>
