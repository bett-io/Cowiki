/* eslint-disable react/jsx-filename-extension */

import React from 'react';

import './styles/index.css';
import createReduxStore from '../modules/store';
import App from './containers/App';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const initialState = window.__INITIAL_STATE__;

const store = createReduxStore(initialState);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
