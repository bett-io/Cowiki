const express = require('express');
const path = require('path');

import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import createReduxStore from '../modules/store';

import article from './apis/article';
import auth from './apis/auth';
import db from './db/db';
import session from './libs/session';

import App from '../src/containers/App';

const file = 'server/app.js';

const getConfig = () => {
  const env = process.env;

  const isProd = env.NODE_ENV === 'production';
  const useLoki = env.DB === 'loki';
  const aws = {};

  if (!useLoki) {
    const region = env.AWS_REGION;
    if (!region) {
      console.error(`AWS_REGION environment variable should be given to use DynamoDB.
        If you want to use local DB instead, set DB environment variable to 'loki'`);
      return undefined;
    }
    aws.region = region;
  }

  return {
    isProd,
    useLoki,
    aws,
  };
}

const config = getConfig();
if (!config) process.exit(-1);

db.init(config.useLoki, config.aws.region);

const app = express();

app.use(bodyParser.json()); // for parsing POST body
app.use(session.createSessionMiddleware());
app.use(express.static(path.join(__dirname, './public')));

// Article APIs
app.post('/api/article/:id', (req, res) => {
  const func = 'app.post /api/article/:id';
  console.log({ file, func, params: req.params, body: req.body});

  const { content } = req.body;

  article.create(req.params.id, content)
    .then(result => res.send(result))
    .catch(error => {
      console.log({ file, func, error });
      res.status(403).send(error);
    });
});

app.get('/api/article/:id', (req, res) => {
  const func = 'app.get /api/article/:id';
  console.log({ file, func, params: req.params });

  article.read(req.params.id)
    .then(result => {
      console.log({ file, func, result });
      res.send(result)
    })
    .catch(error => {
      console.log({ file, func, error });
      res.status(403).send(error);
    });
});

app.put('/api/article/:id', (req, res) => {
  const func = 'app.put /api/article/:id';
  console.log({ file, func, params: req.params, body: req.body });

  const { content, rev } = req.body;

  article.update(req.params.id, content, rev)
    .then(result => res.send(result))
    .catch(error => {
      console.log({ file, func, error });
      res.status(403).send(error);
    });
});

// Pages
app.get('*', (req, res) => {
  console.log({ file, function:'app.get', req: { url: req.url } });

  const context = {};

  // counter in session for demo
  if (!req.session.counter) req.session.counter = 0;
  req.session.counter++;

  const initialState = session.createInitialReduxState(req.session);
  const store = createReduxStore(initialState);

  const appHtml = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    res.redirect(302, context.url);
  } else {
    res.send(renderPage(appHtml, store.getState()));
  }
});

app.post('/signin', (req, res) => {
  console.log({ file, function:'post', req: { url: req.url } });

  auth.signin(req)
    .then((result) => res.send(result))
    .catch((error) => {
      console.log({ file, function: 'post', error });
      res.status(403).send(error);
    });
});

app.post('/signout', (req, res) => {
  console.log({ function:'app.post', req: { url: req.url } });

  res.send(auth.signout(req, res));
});

function renderPage(appHtml, initialState) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>helloworld-lambda-web</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
    <div id=app>${appHtml}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <script src="/bundle.js"></script>
  `;
}

// Export your express server so you can import it in the lambda function.
module.exports = app;
