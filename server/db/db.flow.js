// @Flow

// This file is to share DB Flow types b/w two different DB js files.

export type Article = {
  id: string,
  content: string,
  rev: number,
}

export type User = {
  id: string,
  email: string,
  password: string,
}

export type CreateArticle = Article;
export type ReadArticle = {
  id: string,
};
export type UpdateArticle = Article;

export type CreateUser = User;
export type ReadUser = {
  id: string,
};
