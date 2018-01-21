'use strict';

const express = require('express');
const setupServer = require('./server');
const webpack = require('webpack');
const webpackConfigFunc = require('../webpack.client.config');
const wdm = require('webpack-dev-middleware');
const whm = require('webpack-hot-middleware');

const webpackConfig = webpackConfigFunc();
const compiler = webpack(webpackConfig);

const app = express();

app.use(wdm(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(whm(compiler, {
  log: console.log,
}));

setupServer(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Production Express server running at localhost:', PORT);
});
