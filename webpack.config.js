const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},
	devServer: {
		port: 8080,
	},
	stats: 'minimal', // webpack 控制台 log 信息
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		extensions: ['.tsx', '.ts', '.scss', '.css', '.js', '.json', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.png/,
				type: 'asset/resource',
			},
			{
				test: /\.s[ac]ss|css$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.m?[jt]sx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/react', '@babel/env', '@babel/preset-typescript'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/public/index.html'),
		}),
		new ForkTsCheckerWebpackPlugin(),
		new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
	],
};
