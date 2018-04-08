const fs = require('fs');
const path = require('path');

module.exports = {
  mode: 'development',

  entry: [
    'babel-polyfill', // https://github.com/babel/babel-preset-env/issues/112
    path.resolve(__dirname, 'server/standalone.js'),
  ],

  output: {
    path: path.join(__dirname, '/standalone'),
    filename: 'standalone.bundle.js',
  },

  target: 'node',

  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`;
    return ext;
  }, {}),

  node: {
    __filename: false,
    __dirname: false,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
