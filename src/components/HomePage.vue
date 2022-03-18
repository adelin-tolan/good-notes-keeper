<template>
  <div class="home-page">
    <v-container fluid class="align-center container">
      <v-row justify="center">
        <router-link to="/notes">
          <v-card tile class="card">
            <v-card-title class="text-capitalize"> Notes </v-card-title>
          </v-card>
        </router-link>

        <router-link to="/grocery-list">
          <v-card tile class="card">
            <v-card-title class="text-capitalize"> Grocery List </v-card-title>
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
.home-page {
  background: lightgrey;
}
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
</style>
