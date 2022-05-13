<template>
  <div>
    <v-container class="container" fluid>
      <v-row justify="center">
        <router-link
          v-for="(card, index) in cardsList"
          :key="index"
          :to="card.path"
        >
          <v-card class="card" tile>
            <v-card-title class="text-capitalize">
              {{ $t(`menuLabels.${card.name}`) }}
            </v-card-title>
          </v-card>
        </router-link>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { menuItemsList } from "../utils/menuItems";

export default {
  name: "HomePage",
  components: {},
  data() {
    return {
      cardsList: menuItemsList,
    };
  },
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
