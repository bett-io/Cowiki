// @flow

import React from 'react';

import marked from 'marked';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ArticleLoading from './ArticleLoading';
import NoArticle from './NoArticle';

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
      revision: {revision}
      <Link to={`/edit/${pageId}`}>
        <Button className="pull-right" bsStyle="success">Edit</Button>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </div>
  );
};

export default Article;
