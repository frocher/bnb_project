const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [{
  entry: ['./app.scss', './app.js'],
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),

              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules'],
              },
            },
          },
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./index.html'),
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: resolve('./policy.html'),
      filename: 'policy.html',
      inject: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'images/**',
          context: resolve('.'),
        },
        {
          from: 'robots.txt',
          context: resolve('.'),
        },        
      ],
    }),
  ],
}];