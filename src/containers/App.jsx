import React from 'react';

import connectWithRouter from '../../modules/connectWithRouter';
import Header from '../components/Header';
import MainContainer from '../containers/MainContainer';
import { hot } from 'react-hot-loader';
import { initializeApp } from '../actions';

export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(initializeApp());
  }

  render() {
    return (
      <div>
        <Header/>
        <MainContainer/>
      </div>
    );
  }
}

const connectedApp = connectWithRouter(null, null)(App); // To use this.props.dispatch

export default hot(module)(connectedApp);
