// @flow

import React from 'react';

const Article = (props) => {
  console.log(props);
  const { pageId } = props;

  return (
    <div>
      The article that you're looking for doesn't exist.<br/>
      <a href={`/edit/${pageId}`}>Do you want to create new article?</a>
    </div>
  );
};

export default Article;
