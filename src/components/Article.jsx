// @flow

import React from 'react';

import NoArticle from './NoArticle';
import { Link } from 'react-router-dom';

export type ArticleProps = {
  pageId: string,
  content: string,
  revision: number,
}

const Article = ({ pageId, content, revision }: ArticleProps) => {
  if (revision === undefined) return <NoArticle pageId={pageId} />;

  return (
    <div>
      <h1>{pageId}</h1>
      <br />
      content: {content}
      <br />
      revision: {revision}
      <br />
      <Link to={`/edit/${pageId}`}>Edit</Link>
    </div>
  );
};

export default Article;
