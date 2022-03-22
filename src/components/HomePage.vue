<template>
  <div>
    <v-container fluid class="container">
      <v-row justify="center">
        <router-link to="/notes">
          <v-card tile class="card">
            <v-card-title class="text-capitalize">
              {{ $t("message.features.feature1") }}
            </v-card-title>
          </v-card>
        </router-link>

        <router-link to="/grocery-list">
          <v-card tile class="card">
            <v-card-title class="text-capitalize">
              {{ $t("message.features.feature2") }}
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

<style lang="css" scoped>
.container {
  min-height: 78vh;
  display: flex;
  align-items: center;
}
.card {
  width: 320px;
  height: 112px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

a {
  text-decoration: none;
}
</style>
