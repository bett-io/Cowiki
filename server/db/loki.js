// @flow

// This DB is only for development.

import loki from 'lokijs';

import type { Article } from './db.flow.js';

const db = new loki('local.db');
const articles = db.addCollection('article');

const file = 'server/db/loki.js';

const createArticle = (doc): boolean => {
  console.log({ file, function: 'createArticle', doc });

  return articles.insert(doc);
};

const readArticle = (doc): ?Article => {
  console.log({ file, function: 'readArticle', doc });

  return articles.findOne(doc);
};

const updateArticle = (doc): boolean => {
  console.log({ file, function: 'updateArticle', doc });

  return articles.update(doc);
};

export default {
  createArticle,
  readArticle,
  updateArticle,
};
