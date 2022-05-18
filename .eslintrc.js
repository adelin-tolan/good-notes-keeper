module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "plugin:vue/strongly-recommended",
    "plugin:vue/recommended",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "emits",
          "setup",
          "asyncData",
          "data",
          "fetch",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "LIFECYCLE_HOOKS",
          "methods",
          ["template", "render"],
          "renderError",
        ],
      },
    ],
    "vue/attributes-order": [
      "error",
      {
        alphabetical: true,
      },
    ],
    "vue/no-unused-properties": "warn",
    "vue/no-use-computed-property-like-method": "error",
    "vue/require-name-property": "error",
    "vue/eqeqeq": [
      "error",
      "always",
      {
        null: "ignore",
      },
    ],
    "vue/camelcase": "warn",
    "vue/no-static-inline-styles": [
      "warn",
      {
        allowBinding: true,
      },
    ],
    "vue/max-attributes-per-line": "off",
  },
};
