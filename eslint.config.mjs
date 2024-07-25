import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
// Здесь неважно что написать wayfarer или что то другое. Важно, что именно под этим
// именем будет доступен плагин
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
