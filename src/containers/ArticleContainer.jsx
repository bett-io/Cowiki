// @flow

import React from 'react';

import connectWithRouter from '../../modules/connectWithRouter';
import Article from '../components/Article';

const ArticleContainer = (props) => {
  const { pageId } = props.match.params;

  return (<Article pageId={pageId}/>);
};

export default connectWithRouter(
  null,
  null,
)(ArticleContainer);
