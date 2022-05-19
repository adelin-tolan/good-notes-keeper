<template>
  <div :class="{ 'home-page-background': isHomeRoute }">
    <router-view class="main-display pa-6 mx-auto" />
  </div>
</template>

<script>
export default {
  name: "TheMain",

  computed: {
    isHomeRoute() {
      return this.$route.path === "/";
    },
  },
};
</script>

<style lang="scss" scoped>
$home-page-bg-color: lightgrey;

.home-page-background {
  background: $home-page-bg-color;
}

.main-display {
  width: 100%;
  max-width: 1170px;
  min-height: 635px;
}
</style>
