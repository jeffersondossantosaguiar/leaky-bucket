import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import { config as baseConfig } from "./base.js"

/**
 * Configuração personalizada do ESLint para projetos React com Vite.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const reactViteConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Não é necessário com a nova transformação JSX
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules
    }
  }
]
