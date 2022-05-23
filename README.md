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

## package.json 增加 scripts

```js
"scripts": {
  "start": "webpack serve --mode development",
  "build": "webpack build --mode production"
}
```

然后命令行执行 `yarn start` 打开浏览器访问 `http://localhost:8080/` 就可以初步访问页面了

接下来需要加上 `react`

## 5.增加 react 及 babel-loader

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

## 6.src 目录增加 index.jsx 文件

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

## 7.跟目录新建 .babelrc 文件

```js
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## 8.react 配置完成，`yarn start` 打开 `http://localhost:8080/` 就可以看到 hello react 了

