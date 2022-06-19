module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    camelcase: "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "prettier/prettier": ["error"],
    semi: ["error", "always"],
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "react/destructuring-assignment": "off",
    "react/jsx-no-constructed-context-values": "off",
    "react/jsx-props-no-spreading": "off",
    "react/button-has-type": "off",
    "react/no-array-index-key": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
