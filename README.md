# 使用 webpack5 搭建 react ts app

- 技术栈: webpack5 + React18 + TS

- 工程化: eslint + prettier + husky + git hooks

- 支持图片、less、sass、fonts、数据资源(JSON、csv、tsv 等)、Antd 按需加载以及主题

- 支持热更新、资源压缩、代码分离（动态导入、懒加载等）、缓存、devServer

## 项目初始化

首先从一个空目录开始，对项目初始化：

```js
mkdir demo
cd demo
git init
npm init
```

## React 和 Babel 引入

```shell
pnpm add react react-dom -D
```

由于我们的浏览器不支持最新的 ECMAScript 语法，所以我们需要 Babel 来转义为 ES5 或者 ES6。安装我们的 Babel 来提高兼容性:

```shell
pnpm add @babel/core babel-preset-env babel-preset-react @babel/plugin-proposal-class-properties -D
```

- @babel/core: babel 转码的核心引擎

- babel-preset-env: 添加对 ES5、ES6 的支持

- babel-preset-react: 添加对 JSX 的支持

- @babel/plugin-proposal-class-properties: 对 React 中 class 的支持

## webpack 引入

```shell
pnpm add webpack webpack-cli webpack-dev-server html-webpack-plugin -D
```

- webpack: weback 插件的核心依赖

- webpack-cli: 为插件提供命令行工具

- webpack-dev-server: 帮助启动 live server

- html-webpack-plugin: 帮助创建 HTML 模版

## babel 配置

.babelrc 中添加基本配置:

```js
{
  "presets": ["@babel/react", "@babel/env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

**Babel Plugin**

Babel 是代码转换器，借助 Babel，我们可以使用最流行的 js 写法，而 plugin 就是实现 Babel 功能的核心。

这里的配置是为了支持 react 中 class 的写法。

**Babel Preset**

Babel 的 Plugin 一般拆成尽可能小的粒度，开发者可以按需引进，例如 ES6 到 ES5 的功能，官方提供了 20+插件，这样可以提高性能和扩展性，但是很多时候逐个引入就很让人头大，而 Babel Preset 就是为此而生，可以视为 Presets 是相关 Plugins 的集合。

- @babel/react: 支持了 React 所有的转码需求

- @babel/env: 不夸张滴讲，仅需要它自己内部的配置项，就可以完成现代 JS 工程几乎所有的转码需求

## Webpack 基本配置

新建 webpack.config.js 文件。

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},
	devServer: {
		port: 8080,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/src/index.html'),
		}),
	],
};
```

## Package.json 基本配置

```js
"start": "webpack serve --mode development --open --hot",
"build": "webpack --mode production"
```

## TypeScript 配置

```shell
pnpm add -D typescript fork-ts-checker-webpack-plugin @types/node @types/react @types/react-dom
```

- typescript: TypeScript 的主要引擎

- fork-ts-checker-webpack-plugin: ts 类型检查插件

- @types/node @types/react @types/react-dom: 对 node、react、react dom 类型的定义

**为什么不使用 ts-loader**

因为 babel-loader 可以直接将 ts 文件转成低版本 js，简化编译流程

TS --> babel-loader --> JS（ES5、ES6）

而使用 ts-loader 得经过

TS --> ts-loader --> JS（最新的 ECMAScript 语法） --> JS（ES5、ES6）

根目录新建 tsconfig.json 配置文件

```js
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "Node"
  }
}
```

最后在 webpack 中添加对 ts 的支持。

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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
				test: /\.m?[jt]sx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/public/index.html'),
		}),
		new ForkTsCheckerWebpackPlugin(),
	],
};
```

## 管理资源

**CSS、Sass**

```shell
pnpm add -D style-loader css-loader sass sass-loader
```

webpack.config.js rules 新增配置

```js
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
}
```

**图片、JSON 资源**

对于图片和字体，我们可以使用内置的 Assets Modules 来轻松地把这些内容加到我们的系统中，对于类型，我们可以选择：

- asset/resource 发送一个单独的文件并导出 URL。

- asset/inline 导出一个资源的 data URI。

- asset/source 导出资源的源代码。

- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。

## ESlint 配置

```shell
pnpm add -D eslint eslint-webpack-plugin @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react
```

- eslint: eslint 主要引擎

- eslint-webpack-plugin: webpack loader

- @typescript-eslint/parser: 帮助 ESlint lint ts 代码

- @typescript-eslint/eslint-plugin: 包含 TS 扩展规则的插件

- eslint-plugin-react: 包含 React 扩展规则的插件

**.eslintrc 配置文件**

```js
{
  parser:  '@typescript-eslint/parser',  // ESlint Parser
  extends:  [
    'plugin:react/recommended',  // 从@eslint-plugin-react中选择推荐的规则
    'plugin:@typescript-eslint/recommended',  // 从@typescript-eslint/eslint-plugin选择推荐的规则
  ],
  parserOptions:  {
    ecmaVersion:  2018,  // 帮助转化最先进的ECMAScript功能
    sourceType:  'module',  // 允许imports的用法
    ecmaFeatures:  {
      jsx:  true,  // JSX兼容
    },
  },
  rules:  {
  },
  settings:  {
    react:  {
      version:  'detect',  // 告诉eslint-plugin-react自动检测最新版本的react
    },
  },
}
```

## Prettier 配置

虽然 ESLint 也可以校验代码格式，但 Prettier 更擅长，所以项目中一般会搭配一起使用。为了避免二者的冲突，一般的解决思路是禁掉 ESLint 中与 Prettier 冲突的规则，然后使用 Prettier 做格式化， ESLint 做代码校验。

.prettierrc 配置文件

```js

{
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxBracketSameLine": true,
  "jsxSingleQuote": false,
  "printWidth": 100,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": true,
  "vueIndentScriptAndStyle": false
}
```

## 代码提交规范

prettier 只是保证了在通过编辑器（vs code）进行格式化代码的时候，格式化成需要的格式（当然可以通过配置 onSave 在代码保存时自动格式化），但是无法保证所有人都会主动进行。

因此进行自动格式化显得非常重要，而自动格式化的时机选择 pre-commit 最恰当，通过 git hook ，能够在 commit 之前格式化好代码（如果已经 commit，会将暂存转为提交，生成提交记录，需要回滚才会撤销）。

```shell
pnpm add -D pretty-quick prettier husky
```

- pretty-quick: 配合 git-hooks 进行代码检测，并且 fix

- husky: 可以通过配置的方式来使用 git-hooks，避免手动修改

package.json 设置

```js
{
  "script":{
    ...
    "pretty": "./node_modules/.bin/pretty-quick --staged"
  },
  "husky": {
    "hooks": {
      "pre-commit": "tnpm run pretty"
    }
  },
}

```

# 参考

<https://mp.weixin.qq.com/s/4XxG4NB1dGnWiZdKxGsS5g>
