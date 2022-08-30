const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const PostCSSPresetEnv = require('postcss-preset-env')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  stats: {
    colors: true,
    preset: 'minimal',
  },
  entry: [
    path.resolve(__dirname, 'src/assets/js/index.js'),
    path.resolve(__dirname, 'src/assets/styles/index.css'),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets/'),
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['*', '.js', '.json'],
    alias: {
      // Helpful alias for importing assets
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [PostCSSPresetEnv] } },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: `images/[name][ext]`,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './style.css',
      chunkFilename: '[id].css',
    }),
  ],
}
