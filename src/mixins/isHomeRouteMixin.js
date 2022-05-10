export const isHomeRouteMixin = {
  computed: {
    isHomeRoute() {
      return this.$route.path === "/";
    },
  },
};
