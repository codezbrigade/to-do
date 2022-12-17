module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    //   [prettier]: [
    //     'error',
    //     {
    //       singleQuote: true,
    //       parser: 'flow',
    //     },
    //   ],
    curly: 'off',
    ['react-hooks/exhaustive-deps']: 'off',
    ['no-shadow']: 'off',
  },
};

const prettier = 'prettier/prettier';
