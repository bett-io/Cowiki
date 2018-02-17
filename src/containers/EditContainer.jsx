// @flow

import React from 'react';

import axios from 'axios';
import connectWithRouter from '../../modules/connectWithRouter';
import Edit from '../components/Edit';

import type { Article } from '../actions/article';

const file = '/src/containers/EditContainer';

const EditContainer = (props) => {
  const { pageId, onSubmit, history } = props;

  const _onSubmit = (content, rev, note) => onSubmit(pageId, content, rev, note, history);
  const args = Object.assign({}, props, { onSubmit: _onSubmit });

  return (<Edit {...args} />);
};

const updateArticle = async (
  id: string,
  content: string,
  rev: number,
  note: string,
  history: Object,
) => {
  console.log({ file, func: 'updateArticle', id, content, rev, note });
  if (rev < 0) {
    await axios.post(`/api/article/${id}`, { content });
  } else {
    await axios.put(`/api/article/${id}`, { content, rev, note });
  }

  history.push(`/w/${id}`);
};

const mapStateToProps = (state, ownProps) => {
  const { pageId } = ownProps.match.params;

  const article: Article = state.articles[pageId];

  return {
    pageId,
    content: article && article.content,
    revision: article ? article.rev : -1,
  };
};

const mapDispatchToProps = () => ({
  onSubmit: updateArticle,
});

export default connectWithRouter(
  mapStateToProps,
  mapDispatchToProps,
)(EditContainer);
