// @flow

import React from 'react';

import marked from 'marked';
import ta from 'time-ago';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ArticleLoading from './ArticleLoading';
import NoArticle from './NoArticle';

export type ArticleProps = {
  pageId: string,
  content: string,
  revision: number,
  lastDate: string,
  lastUser: ?string,
  lastIp: string,
}

// Article component can have three state based on revision of the Article.
// 1. revision === undefined, this means Article information is still being loaded.
// 2. revision === -1, this means there is no Article for this id.
// 3. revision >= 0, this means Article infomation is loaded and displayable.
const Article = ({ pageId, content, revision, lastDate, lastUser, lastIp }: ArticleProps) => {
  if (revision === undefined) return <ArticleLoading />;
  if (revision === -1) return <NoArticle pageId={pageId} />;

  const user = lastUser || `anonymous(${lastIp})`;
  const ago = ta.ago(lastDate);

  return (
    <div>
      <h1>{pageId}</h1>
      <p>
        {user} edited this page at {ago} · {revision + 1} revisions
      </p>
      <Link to={`/edit/${pageId}`}>
        <Button className="pull-right" bsStyle="success">Edit</Button>
      </Link>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
    </div>
  );
};

export default Article;
