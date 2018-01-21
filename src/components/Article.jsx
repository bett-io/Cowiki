// @flow

import React from 'react';

import ArticleLoading from './ArticleLoading';
import NoArticle from './NoArticle';
import { Link } from 'react-router-dom';

export type ArticleProps = {
  pageId: string,
  content: string,
  revision: number,
}

// Article component can have three state based on revision of the Article.
// 1. revision === undefined, this means Article information is still being loaded.
// 2. revision === -1, this means there is no Article for this id.
// 3. revision >= 0, this means Article infomation is loaded and displayable.
const Article = ({ pageId, content, revision }: ArticleProps) => {
  if (revision === undefined) return <ArticleLoading />;
  if (revision === -1) return <NoArticle pageId={pageId} />;

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
