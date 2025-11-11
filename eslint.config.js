// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import babelParser from '@babel/eslint-parser';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // مسیرهایی که باید نادیده گرفته بشن
  { ignores: ['node_modules/', 'dist/', 'build/'] },

  {
    files: ['**/*.{js,mjs,cjs,jsx,tsx,ts}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
        requireConfigFile: false,
      },
      globals: globals.browser,
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
    },

    settings: {
      react: {
        version: 'detect', // 👈 به ESLint می‌گه ورژن React رو خودش تشخیص بده
      },
    },

    rules: {
      // قوانین پیشنهادی جاوااسکریپت و ری‌اکت
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Prettier
      'prettier/prettier': 'error',

      // رفع ارور 'React must be in scope'
      'react/react-in-jsx-scope': 'off',

      // اختیاری: جلوگیری از هشدار prop-types اگر از TypeScript استفاده نمی‌کنی
      'react/prop-types': 'off',

      'no-unused-vars': 'warn',
    },
  },

  // پیکربندی Prettier برای اطمینان از هماهنگی با ESLint
  prettierConfig,
]);
