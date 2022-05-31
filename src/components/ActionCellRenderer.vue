<template>
  <v-icon
    class="green--text mt-n1"
    :disabled="params.node.data.isPurchased"
    @click="handleEditIconClick"
  >
    mdi-pencil
  </v-icon>
</template>

<script>
export default {
  name: "ActionCellRenderer",
  methods: {
    handleEditIconClick() {
      this.params.context.componentParent.getGroceryToEdit(this.params.node.data);
    },
  },
};
</script>
