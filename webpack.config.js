const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.tsx', '.ts', '.scss', '.css', '.js', '.json', '.jsx']
  },
  devServer: {
    hot: true,
    historyApiFallback: true  // fix reload page cannot get [url]
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.s[ac]ss|css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.m?[jt]sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // HMR
            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean)
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    isDevelopment && new ForkTsCheckerWebpackPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin()
  ].filter(Boolean)
};

