import { defineConfig } from 'eslint/config';
import airbnb from 'eslint-config-airbnb-extended';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

// Extract actual plugins from airbnb config objects
const plugins = {
  react: airbnb.plugins.react.plugins.react,
  'react-hooks': airbnb.plugins.reactHooks.plugins['react-hooks'],
  'react-a11y': airbnb.plugins.reactA11y.plugins['jsx-a11y'],
  'import-x': airbnb.plugins.importX.plugins['import-x'],
  stylistic: airbnb.plugins.stylistic.plugins['@stylistic'],
  next: airbnb.plugins.next.plugins['@next/next'],
  typescriptEslint: airbnb.plugins.typescriptEslint.plugins['@typescript-eslint'],
};

export default defineConfig([
  // Include plugins
  {
    plugins,
  },
  // Use Next.js + TypeScript config from airbnb-extended
  ...airbnb.configs.next.typescript,
  // Add TypeScript parser configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  prettier,
  {
    rules: {
      // Next.js specific overrides
      'react/react-in-jsx-scope': 'off', // Next.js doesn't require React import
      'react/prop-types': 'off', // Using TypeScript for prop validation
    },
  },
  {
    ignores: [
      '.next',
      'out',
      'dist',
      'build',
      'node_modules',
      '*.config.js',
      '*.config.mjs',
      'public',
    ],
  },
]);
