import React from 'react';

import connectWithRouter from '../../modules/connectWithRouter';
import Home from '../components/Home';
import Repos from '../components/Repos';
import About from '../components/About';
import Hello from '../components/Hello';
import ArticleContainer from './ArticleContainer';
import EditContainer from './EditContainer';
import { Route, Switch } from 'react-router-dom';

const MainContainer = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/repos' component={Repos}/>
      <Route path='/hello' component={Hello}/>
      <Route path='/about' component={About}/>
      <Route exact path='/w' component={ArticleContainer}/>
      <Route exact path='/w/:pageId' component={ArticleContainer}/>
      <Route exact path='/edit/:pageId' component={EditContainer}/>
    </Switch>
  </div>
);

export default connectWithRouter(
  null,
  null,
)(MainContainer);
