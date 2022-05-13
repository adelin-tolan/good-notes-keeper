<template>
  <v-card class="pa-4" outlined tile>
    <v-card-title class="mb-2">
      {{ title }}
    </v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ChartContainer",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  background: #f7f7f7;
  border: none;

  .v-card__title {
    font-size: 25px;
    font-weight: bold;
    color: #00457c;
  }
  .v-card__subtitle {
    font-size: 20px;
    color: #00457c;
  }
}
</style>
