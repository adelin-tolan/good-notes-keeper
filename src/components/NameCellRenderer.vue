<template>
  <router-link
    :to="{
      name: 'Grocery Item',
      params: {
        groceryItemId: params.node.data.id,
      },
    }"
  >
    {{ params.node.data.name }}
  </router-link>
</template>

<script>
export default {
  name: "NameCellRenderer",
};
</script>
