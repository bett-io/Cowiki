// @flow

// This DB is only for development.

import loki from 'lokijs';

import type { CreateArticle, ReadArticle, UpdateArticle, Article } from './db.flow';

const db = new loki('local.db');
const articles = db.addCollection('article');

const file = 'server/db/loki.js';

const createArticle = (doc: CreateArticle): boolean => {
  console.log({ file, function: 'createArticle', doc });

  return articles.insert(doc);
};

const readArticle = (doc: ReadArticle): ?Article => {
  console.log({ file, function: 'readArticle', doc });

  return articles.findOne(doc);
};

const updateArticle = (doc: UpdateArticle): boolean => {
  console.log({ file, function: 'updateArticle', doc });

  return articles.update(doc);
};

export default {
  createArticle,
  readArticle,
  updateArticle,
};
