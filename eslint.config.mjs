import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import wayfarer from "eslint-plugin-wayfarer-plugin";
import publicApiChecker from "eslint-plugin-public-api-imports";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      wayfarer,
      publicApiChecker,
    },
    rules: {
      "react/display-name": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "wayfarer/path-checker": ["warn", { alias: "@" }],
      "publicApiChecker/public-api-import-checker": ["warn", { alias: "@" }],
      "publicApiChecker/layer-imports": [
        "warn",
        { alias: "@", ignoreImportPatterns: ["**/StoreProvider"] },
      ],
    },
  },
];
