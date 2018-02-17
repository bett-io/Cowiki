import React from 'react';

import App from '../src/containers/App';
import article from './apis/article';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createReduxStore from '../modules/store';
import db from './db/db';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { authConfig } from '../config';
import { renderToString } from 'react-dom/server';

const file = 'server/server.jsx';

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

const setupServer = (app) => {
  app.use(cookieParser());
  app.use(bodyParser.json()); // for parsing POST body

  app.use(
    expressJwt({
      secret: authConfig.jwt.secret,
      credentialsRequired: false,
      getToken: req => { console.log(req.cookies); return req.cookies ? req.cookies.id_token : undefined },
    }),
  );

  // Error handler for express-jwt
  app.use((err, req, res, next) => {
    const func = 'app.use Jwt401Error';

    if (err instanceof Jwt401Error) {
      console.error(file, func, req.cookies.id_token);
      res.clearCookie('id_token');
    }
    next(err);
  });

  // Article APIs
  app.post('/api/article/*?', (req, res) => {
    const func = 'app.post /api/article/:id';
    console.log({ file, func, params: req.params, body: req.body});

    const { content } = req.body;

    const uid = req.user ? req.user.id : '';

    article.create(req.params[0], content, uid, req.ip)
      .then(result => res.send(result))
      .catch(error => {
        console.log({ file, func, error });
        res.status(403).send(error);
      });
  });

  app.get('/api/article/*?', (req, res) => {
    const func = 'app.get /api/article/:id';
    console.log({ file, func, params: req.params });

    article.read(req.params[0])
      .then(result => {
        console.log({ file, func, result });
        res.send(result)
      })
      .catch(error => {
        console.log({ file, func, error });
        res.status(403).send(error);
      });
  });

  app.put('/api/article/*?', (req, res) => {
    const func = 'app.put /api/article/:id';
    console.log({ file, func, params: req.params, body: req.body });

    const { content, rev, note } = req.body;

    const uid = req.user ? req.user.id : '';

    article.update(req.params[0], content, rev, uid, req.ip, note)
      .then(result => res.send(result))
      .catch(error => {
        console.log({ file, func, error });
        res.status(403).send(error);
      });
  });

  // Authentication APIs
  const setIdCookie = (res, user) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(user, authConfig.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  }

  app.post('/api/signin', (req, res) => {
    const func = 'app.post /api/signin';

    console.log({ file, func, body: req.body });

    const { userName, password } = req.body;

    db.readUser({ id: userName }).then((user) => {
      if (!user) {
        res.send({ error: 'unregistered username' });
        return;
      }

      if (user.password !== password) {
        res.send({ error: 'password mismatch' });
        return;
      }

      const { id } = user;
      req.user = (({ id }) => ({ id }))(user);

      setIdCookie(res, req.user);

      res.send({ user: req.user });
    }).catch(error => {
      console.log({ file, func, error });
      res.status(403).send(error);
    })
  });

  app.post('/api/signup', (req, res) => {
    const func = 'app.post /api/signup';

    console.log({ file, func, body: req.body });

    const { userName, email, password } = req.body;

    db.createUser({ id: userName, email, password }).then(() => {
      const user = { id: userName, email };
      setIdCookie(res, user);

      res.send({ user });
    }).catch(error => {
      console.log({ file, func, error });
      res.status(403).send(error);
    })
  });

  app.post('/api/signout', (req, res) => {
    const func = 'app.get /api/signout';

    console.log({ file, func });

    res.clearCookie('id_token');
    res.send();
  });

  app.post('/api/signup_check/username', (req, res) => {
    const func = 'app.post /api/signup_check/username';

    console.log({ file, func, body: req.body });

    const { userName } = req.body;

    db.readUser({ id: userName }).then((user) => {
      res.send({ result: !user });
      return;
    }).catch(error => {
      console.log({ file, func, error });
      res.status(403).send(error);
    })
  });

  // Pages
  app.get('/w/*?', (req, res) => {
    const func = 'app.get /w/:id';

    console.log({ file, func, params: req.params });

    article.read(req.params[0])
      .then(result => {
        console.log({ file, func, result });
        const articleState = { articles: { [req.params[0]]: result }}

        return renderPage(req, res, articleState)
      })
      .catch(error => {
        console.log({ file, func, error });
        res.status(403).send(error);
      });
  });

  app.get('*', (req, res) => {
    console.log({ file, func: 'app.get *', req: { url: req.url }, params: req.params });

    return renderPage(req, res)
  });
}

const renderPage = (req, res, initialState) => {
  const context = {};

  const store = createReduxStore(Object.assign({}, { user: req.user }, initialState));

  console.log({ file, func: 'renderPage', user: req.user, initialState });

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
    res.send(renderHtml(appHtml, store.getState()));
  }
}

function renderHtml(appHtml, initialState) {
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
module.exports = setupServer;
