<template>
  <v-checkbox
    v-model="params.node.data.isPurchased"
    class="mt-1"
    :disabled="params.node.data.isPurchased"
    @click.native.capture="handleCheckboxClick($event)"
  />
</template>

<script>
export default {
  name: "PurchasedCellRenderer",
  methods: {
    handleCheckboxClick(event) {
      event.stopPropagation();
      this.params.context.componentParent.getGroceryIdAndOpenConfirmationDialog(
        this.params.node.data.id
      );
    },
  },
};
</script>
