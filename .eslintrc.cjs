module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'standard-with-typescript',
      'plugin:react/recommended',
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [
          '.eslintrc.{js,cjs}',
        ],
        parserOptions: {
          sourceType: 'script',
        },
      },
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.displayMode.json'],
      tsconfigRootDir: __dirname,
    },
    plugins: [
      'react',
    ],
    ignorePatterns: ['*.cjs'],
    rules: {
      // Desativando regras específicas do TypeScript
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
  
      // Desativando regras específicas do React
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
  
      // Para desativar a regra 'eol-last'
      'eol-last': 'off',
    },
  };
  