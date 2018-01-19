// @flow

export type Article = {
  id: string,
  content: string,
  rev: number,
}

export const updateArticle = (id: string, article: Article) => async (dispatch: Function) => {
  dispatch({
    type: 'UPDATE_ARTICLE',
    id,
    article,
  });
};
