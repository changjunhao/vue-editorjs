const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    'vue-editorjs': './src/index.js',
    'vue-editorjs.min': './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'VueEditorJS',
    libraryTarget: 'umd'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /min/
      })
    ]
  }
}
