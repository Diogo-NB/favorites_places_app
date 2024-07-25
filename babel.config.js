module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@assets': './assets',
            '@utils': './src/util',
            '@services': './src/services',
            '@context': './src/context',
            '@navigation': './src/navigation',
          },
        }
      ]
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};