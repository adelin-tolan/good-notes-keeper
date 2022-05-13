<template>
  <div v-if="!isHomeRoute">
    <v-app-bar>
      <v-container class="d-flex justify-center" fluid>
        <v-row class="menu-row px-5" dense>
          <v-col class="flex-grow-0">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  class="my-auto"
                  color="success accent-4"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="handleBackClick"
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
            />
          </v-col>
          <v-col>
            <v-tabs v-if="!$vuetify.breakpoint.mobile" class="tabs my-0">
              <v-tab
                v-for="(tab, index) in menuItemsList"
                :key="index"
                :to="tab.path"
              >
                {{ $t(`menuLabels.${tab.name}`) }}
              </v-tab>
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
        <v-spacer />
        <v-btn class="mt-4 mr-4 mb-2" icon @click="handleDrawerCloseClick">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <v-list dense nav>
        <v-list-item-group>
          <router-link
            v-for="(tab, index) in menuItemsList"
            :key="index"
            :to="tab.path"
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
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).highlighted {
  color: #1976d2;
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
