/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { hydrate } from 'react-dom';
import './styles/index.css';
import { Provider } from 'react-redux';
import createReduxStore from '../modules/store';

import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';

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
