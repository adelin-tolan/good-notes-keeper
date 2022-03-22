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
    </v-data-table>
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
      ],
      groceryList: [],
    };
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
};
</script>
