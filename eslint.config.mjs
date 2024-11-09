import tseslint from 'typescript-eslint';
import configs from 'rete-cli/configs/eslint.mjs';
import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import tsParser from '@typescript-eslint/parser';

export default tseslint.config(
  ...configs,
  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),
  {
    files: [ 'src/**/*.{ts,tsx,vue}', 'test/**/*.{ts,tsx}' ],
    ...configs[configs.length - 2],
  },
  {
    rules: {
    '@stylistic/indent': [ 'error', 2 ],
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        project: 'tsconfig.json',
        extraFileExtensions: ['.vue']
      },
    }
  }
)