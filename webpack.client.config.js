const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    'babel-polyfill', // https://github.com/babel/babel-preset-env/issues/112
    './src/index.js',
  ],

  output: {
    path: path.join(__dirname, '/dist/public'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [],
};

module.exports = (env) => {
  if (env === 'production') {
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  }

  return config;
};

