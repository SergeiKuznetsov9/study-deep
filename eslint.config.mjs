import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import wayfarer from 'eslint-plugin-wayfarer-plugin'

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      wayfarer
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "wayfarer/path-checker": "warn",
      
    },
  },
];
