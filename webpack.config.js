const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  devServer: {
    port: 8080,
    hot: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: '/.js$/',
        use: 'babel-loader',
        exclude: '/nome_modules/',
      },
    ],
  },
}
