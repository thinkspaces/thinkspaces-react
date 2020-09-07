module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: ["react", "react-hooks"],
  extends: ["airbnb", "prettier", "prettier/react"],
  rules: {
    "space-in-parens": [0, "always"],
    "object-curly-spacing": [2, "always"],
    "implicit-arrow-linebreak": [0],
    "object-curly-newline": [0, "never"],
    "computed-property-spacing": [2, "never"],
    "no-multiple-empty-lines": [2, { max: 1, maxEOF: 0, maxBOF: 0 }],
    "no-use-before-define": [2, { functions: false }],
    semi: [0, "never"],
    "prefer-const": 1,
    "react/prefer-es6-class": 0,
    "react/prefer-stateless-function": [1],
    "react/jsx-filename-extension": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-curly-spacing": [2, "never"],
    "react/jsx-indent": [2, 2],
    "react/prop-types": [0],
    "react/no-array-index-key": [0],
    "class-methods-use-this": [1],
    "no-undef": [1],
    "no-case-declarations": [1],
    "no-return-assign": [1],
    "no-param-reassign": [1],
    "no-shadow": [1],
    camelcase: [1],
    "no-underscore-dangle": [0, "always"],
    "react-hooks/rules-of-hooks": "error",
    //"react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
};
