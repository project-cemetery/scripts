module.exports = {
  extends: ['plugin:react/recommended'],
  plugins: ['react-hooks', 'react-hooks-breadhead'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-hooks-breadhead/exhaustive-deps': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
  },
};
