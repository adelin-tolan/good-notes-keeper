<template>
  <div>
    <v-container fluid class="container">
      <v-row justify="center">
        <router-link to="/notes">
          <v-card tile class="card">
            <v-card-title class="text-capitalize">
              {{ $t("message.features.notes") }}
            </v-card-title>
          </v-card>
        </router-link>

        <router-link to="/grocery-list">
          <v-card tile class="card">
            <v-card-title class="text-capitalize">
              {{ $t("message.features.groceryList") }}
            </v-card-title>
          </v-card>
        </router-link>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {},
};
</script>

<style lang="scss" scoped>
$text-decoration: none;
$text-decoration-hover: underline green;
$bg-color: rgba(255, 255, 255, 1);
$bg-color-hover: rgba(255, 255, 255, 0.7);

.container {
  min-height: 78vh;
  display: flex;
  align-items: center;
}
a {
  text-decoration: $text-decoration;
  .card {
    width: 320px;
    height: 112px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    &:hover {
      background: $bg-color-hover;
    }
  }
  &:hover {
    text-decoration: $text-decoration-hover;
  }
}
</style>
