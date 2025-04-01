//@ts-check
import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import tsParser from "@typescript-eslint/parser";
import vitest from "@vitest/eslint-plugin";
import checkFile from "eslint-plugin-check-file";
import eslintPluginImportX from "eslint-plugin-import-x";
import reactPlugin from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "pbd-core-api.ts",
      "storeApi.ts",
      "azureArmFunctionApi.ts",
      "azureFunctionApi.ts",
      "qmAdminApi.ts",
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeCheckedOnly,
      eslintPluginImportX.flatConfigs.recommended,
      eslintPluginImportX.flatConfigs.typescript,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
      ...pluginQuery.configs["flat/recommended"],
    ],
    settings: {
      "import/resolver": {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        node: true,
        react: {
          version: "detect",
        },
      },
    },
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parser: tsParser,
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: reactPlugin,
      "check-file": checkFile,
      "react-compiler": reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-compiler/react-compiler": "error",
      "no-console": ["error"],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        {
          ignoreArrowShorthand: true,
        },
      ],
      "prefer-template": ["error"],
      // Start of complexity reduction
      "max-lines-per-function": ["warn", { max: 250, skipBlankLines: true, skipComments: true }],
      "max-lines": ["warn", 400],
      "max-depth": ["warn", 3],
      "max-nested-callbacks": ["warn", 3],
      "max-params": ["warn", 3],
      // TODO: Should be less than 10 in the future
      complexity: ["warn", { max: 15 }],
      "no-else-return": "warn",
      // End of complexity reduction
      "@typescript-eslint/no-misused-promises": [
        "warn",
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "import-x/no-unresolved": ["off"],
      "import-x/order": [
        "error",
        {
          "newlines-between": "always",
          groups: ["builtin", "external", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "external",
              position: "after",
            },
          ],
          distinctGroup: true,
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
      "import-x/no-named-as-default": ["off"],
      "import-x/no-named-as-default-member": ["off"],
      "import-x/namespace": ["off"],
      "import-x/default": ["off"],
      "react/jsx-no-useless-fragment": ["warn"],
      "react/prop-types": ["off"],
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "forbid",
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "typeParameter",
          format: ["PascalCase"],
          prefix: ["T", "K"],
        },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "function",
          format: ["PascalCase", "camelCase"],
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE", "PascalCase"],
        },
        {
          selector: "import",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: ["classProperty", "classMethod"],
          modifiers: ["static", "public"],
          format: ["camelCase", "PascalCase"],
        },
      ],
      "no-restricted-syntax": [
        "error",
        // Based on: https://typescript-eslint.io/troubleshooting/faqs/general/#how-can-i-ban-specific-language-feature
        // Ban `private` members:
        {
          selector: ':matches(PropertyDefinition, MethodDefinition)[accessibility="private"]',
          message: "Use `#private` members instead.",
        },
        // Ban static `this`:
        {
          selector: "MethodDefinition[static = true] ThisExpression",
          message: "Prefer using the class's name directly.",
        },
      ],
      "no-restricted-imports": [
        "warn",
        {
          name: "reactstrap",
          message: "Please use react-bootstrap instead.",
        },
      ],
      "react/display-name": ["off"],
      "import/named": ["off"],
      "check-file/filename-naming-convention": [
        "error",
        {
          // all files should be camelCase to prevent problems with git.
          "**/*.{jsx,tsx}": "CAMEL_CASE",
          "**/*.{js,ts}": "CAMEL_CASE",
        },
        {
          // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
          ignoreMiddleExtensions: true,
        },
      ],
      "react/no-unstable-nested-components": ["warn", { allowAsProps: true }],
      "react/hook-use-state": ["warn"],
    },
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.ts", "**/*.tsx"],
    extends: [eslintPluginPrettierRecommended],
    rules: {
      ...eslintConfigPrettier.rules,
    },
  },
  {
    files: ["**/*.test.*", "**/*.spec.*"], // or any other pattern
    plugins: {
      vitest,
      "testing-library": testingLibrary,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...testingLibrary.configs["flat/react"].rules,
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
      "vitest/max-nested-describe": ["error", { max: 3 }], // you can also modify rules' behavior using option like this
    },
  },
);
