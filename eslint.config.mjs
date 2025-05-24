import tseslint from "typescript-eslint";
import configs from "rete-cli/configs/eslint.mjs";
import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import tsParser from "@typescript-eslint/parser";
import vuePug from "eslint-plugin-vue-pug";

export default tseslint.config(
  ...configs,
  ...pluginVue.configs["flat/essential"],
  ...vuePug.configs["vue3-recommended"],
  ...vueTsEslintConfig(),
  {
    ...configs[configs.length - 2],
    "files": [
      "src/**/*.{ts,tsx,vue,mjs}",
      "test/**/*.{ts,tsx}"
    ]
  },
  {
    "files": ["**/*.{js,mjs}"],
    "rules": {
      "@stylistic/indent": [
        "error",
        2
      ]
    }
  },
  {
    "files": [
      "**/*.ts",
      "**/*.tsx",
      "**/*.mts",
      "**/*.vue"
    ],
    "languageOptions": {
      "parserOptions": {
        "parser": tsParser,
        "project": "tsconfig.json",
        "extraFileExtensions": [".vue"]
      }
    },
    "rules": {
      "no-console": "warn",
      "vue/multi-word-component-names": "off"
    }
  },
  {
    "files": [
      "**/*.js",
      "**/*.vue"
    ],
    "rules": {
      "vue/multi-word-component-names": "off",
      "vue/no-reserved-component-names": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off"
    }
  }
);
