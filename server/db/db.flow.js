// @Flow

// This file is to share DB Flow types b/w two different DB js files.

export type Article = {
  id: string,
  content: string,
  rev: number,
}

export type CreateArticle = Article;
export type ReadArticle = {
  id: string,
};
export type UpdateArticle = Article;
