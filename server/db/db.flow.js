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

export type User = {
  id: string,
  email: string,
  password: string,
}

export type CreateUser = User;
export type ReadUser = {
  id: string,
};

export type Change = {
  id: string,
  rev: number,
  uid: string,
  date: number,
  ip: string,
  change: string,
}

export type CreateChange = Change;
export type ReadChange = {
  id: string,
  rev: number,
};
