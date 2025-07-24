import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooksConfig from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Base ESLint recommended rules
  pluginJs.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // pluginReact.configs.flat['jsx-runtime'],

  // React recommended rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...pluginReactConfig,
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat["jsx-runtime"],
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReact.configs.flat["jsx-runtime"].rules,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
      jsx: {
        pragma: "React", // Default for older React versions
        pragmaFrag: "React.Fragment", // Default for older React versions
        runtime: "automatic", // Use new JSX transform (react/jsx-runtime)
      },
    },
  },

  // React Hooks rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": pluginReactHooksConfig,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Prettier integration
  eslintConfigPrettier, // Turns off ESLint rules that conflict with Prettier
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error", // Runs Prettier as an ESLint rule
    },
  },

  // Global variables for browser environments
  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Ignore files and directories
  {
    ignores: ["dist/", "node_modules/"],
  },
];

export default eslintConfig;
