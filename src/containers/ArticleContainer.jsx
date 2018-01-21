// @flow

import React from 'react';

import axios from 'axios';
import connectWithRouter from '../../modules/connectWithRouter';
import Article from '../components/Article';
import { updateArticle } from '../actions/article';

const file = '/src/containers/ArticleContainer';

const ArticleContainer = (props) => {
  const { pageId } = props.match.params;
  const { content, revision, onReadArticle } = props;

  console.log({ file, func: 'ArticleContainer', pageId });

  onReadArticle(pageId);

  return (<Article pageId={pageId} content={content} revision={revision}/>);
};

const readArticle = id => async (dispatch) => {
  const result = await axios.get(`/api/article/${id}`);

  if (result.status !== 200) return;

  dispatch(updateArticle(id, result.data));
};

const mapStateToProps = (state, ownProps) => {
  const { pageId } = ownProps.match.params;

  const article = state.articles[pageId];

  return {
    content: article && article.content,
    revision: article && article.rev,
  };
};

const mapDispatchToProps = dispatch => ({
  onReadArticle: id => dispatch(readArticle(id)),
});

export default connectWithRouter(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleContainer);
