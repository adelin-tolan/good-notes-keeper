<template>
  <div v-if="!isHomeRoute">
    <v-app-bar>
      <v-container fluid class="d-flex justify-center">
        <v-row dense class="menu-row px-5">
          <v-col class="flex-grow-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-auto"
                  color="success accent-4"
                  @click="handleBackClick"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </template>
              <span>Click to go back</span>
            </v-tooltip>
          </v-col>
          <v-col class="d-lg-none">
            <v-app-bar-nav-icon
              v-if="$vuetify.breakpoint.mobile"
              @click="handleDrawerOpenClick"
            ></v-app-bar-nav-icon>
          </v-col>
          <v-col>
            <v-tabs v-if="!$vuetify.breakpoint.mobile" class="tabs my-0">
              <v-tab
                v-for="(tab, index) in menuItemsList"
                :to="tab.path"
                :key="index"
                >{{ $t(`menuLabels.${tab.name}`) }}</v-tab
              >
            </v-tabs>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      v-if="isDrawerOpen"
      v-model="isDrawerOpen"
      absolute
      temporary
    >
      <v-row>
        <v-spacer></v-spacer>
        <v-btn icon class="mt-4 mr-4 mb-2" @click="handleDrawerCloseClick">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-list nav dense>
        <v-list-item-group>
          <router-link
            v-for="(tab, index) in menuItemsList"
            :to="tab.path"
            :key="index"
          >
            <v-list-item
              active-class="highlighted"
              :class="$route.path.startsWith(tab.path) ? 'highlighted' : ''"
            >
              <v-list-item-title>
                {{ $t(`menuLabels.${tab.name}`) }}
              </v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { isHomeRouteMixin } from "../mixins/isHomeRouteMixin";
import { menuItemsList } from "../utils/menuItems";

export default {
  name: "TheMenu",
  mixins: [isHomeRouteMixin],
  data() {
    return {
      isDrawerOpen: false,
      menuItemsList: menuItemsList,
    };
  },

  computed: {
    activeMenuItem(itemPath) {
      return this.$route.path.startsWith(itemPath) ? "highlighted" : "";
    },
  },

  methods: {
    handleDrawerOpenClick() {
      this.isDrawerOpen = true;
    },
    handleDrawerCloseClick() {
      this.isDrawerOpen = false;
    },
    handleBackClick() {
      this.isDrawerOpen = false;
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
aside a {
  text-decoration: none;
}
.highlighted {
  color: #1976d2 !important;
  background: #e4effa;
}
.menu-row {
  width: 100%;
  max-width: 1170px;
}

::v-deep {
  .theme--light.v-tabs > .v-tabs-bar {
    background: transparent;
  }
}
</style>
