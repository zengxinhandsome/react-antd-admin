# 使用 webpack5 搭建 react app

## 1.初始化一个 npm 项目

```shell
npm init -y
```

## 2.安装 webpack webpack-cli webpack-dev-server

```shell
yarn add webpack webpack-cli webpack-dev-server -D
```

### 3.新建 webpack.config.js 文件

src 目录下新建入口文件 index.js

并且配置 output 打包目录

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
};
```

## 4.安装 html-webpack-plugin 配置模板 html 文件

根目录新建 index.html 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>react antd admin</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

```shell
yarn add html-webpack-plugin -D
```

webpack.config.js 新增 plugins

```js
{
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })];
}
```

## 5.package.json 增加 scripts

```js
"scripts": {
  "start": "webpack serve --mode development",
  "build": "webpack build --mode production"
}
```

然后命令行执行 `yarn start` 打开浏览器访问 `http://localhost:8080/` 就可以初步访问页面了

接下来需要加上 `react`

## 6.增加 react 及 babel-loader 等三方库

```shell
yarn add react react-dom

yarn add @babel/core @babel/preset-env @babel/preset-react babel-loader -D
```

webpack.config.js 增加 babel-loader

```js
module: {
  rules: [
    {
      test: /\.m?jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ];
}
```

## 7.src 目录新建 index.jsx 文件

index.jsx

```js
import React from 'react';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);

const App = () => {
  return <div>hello react app</div>;
};

root.render(<App />);
```

webpack.config.js 修改入口文件

```js
{
  entry: './src/index.jsx';
}
```

## 8.跟目录新建 .babelrc 文件

```js
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## 9.react 配置完成，`yarn start` 打开 `http://localhost:8080/` 就可以看到 hello react 了

## 10.增加 TypeScript

- babel-loader： 编译 ES6 + [jt]sx

如果已经使用 babel-loader 的情况下，配合 @babel/preset-typescript 就可以编译 ts，不需要 ts-loader

https://webpack.js.org/guides/typescript/#:~:text=Note%20that%20if,any%20type%20checking.

- `[fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)
  tsx 类型检查

### 速度提升

babel-loader + ts-loader：5000ms

babel-loader + fork-ts-checker-webpack-plugin 3800ms

## 11 增加 HMR

解决方案：

- [React Refresh Webpack Plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)

支持 react hooks 热更新，支持 react 18+

- [React Hot Loader](https://github.com/gaearon/react-hot-loader#hot-loaderreact-dom)

支持 react hooks 热更新，但是不支持 react 18，并且官方表示后续也不会计划支持：https://github.com/gaearon/react-hot-loader/issues/1808

所以最终选择 React Refresh Webpack Plugin

