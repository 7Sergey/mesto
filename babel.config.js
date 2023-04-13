module.exports = {
  presets: [
    '@babel-preset-env',
    {
      useBuiltIns: 'entry',
      corejs: 3,
      targets: {
        chrome: 90,
        ie: 8,
      },
    },
  ],
}
