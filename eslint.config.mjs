import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import js from "@eslint/js";
import { configs } from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import stylisticPlugin from "@stylistic/eslint-plugin";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "dist/**"]),
  js.configs.recommended,
  ...configs.recommended,
  {
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
      "@stylistic": stylisticPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      indent: "off",
      "@typescript-eslint/indent": "off",
      "@stylistic/indent": "off",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "import/no-unresolved": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "*.css",
              group: "unknown",
              patternOptions: { matchBase: true },
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "never",
          warnOnUnassignedImports: true,
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "single", { avoidEscape: true }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "prettier/prettier": [
        "error",
        {
          printWidth: 100,
          tabWidth: 2,
          singleQuote: true,
          semi: true,
          jsxSingleQuote: true,
          quoteProps: "as-needed",
          trailingComma: "none",
          endOfLine: "auto",
          bracketSpacing: true,
          bracketSameLine: false,
        },
      ],
      "react-hooks/exhaustive-deps": "off",
    },
  },
]);

export default eslintConfig;
