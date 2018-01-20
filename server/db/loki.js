// @flow

// This DB is only for development.

import loki from 'lokijs';

import type { Article } from './db.flow.js';

const db = new loki('local.db');
const articles = db.addCollection('article');

const file = 'server/db/loki.js';

export type LokiArticle = {
  id: string,
  content?: string,
  revision?: number,
}

const createArticle = (doc: LokiArticle): boolean => {
  console.log({ file, function: 'createArticle', doc });

  return articles.insert(doc);
};

const readArticle = (doc: LokiArticle): ?Article => {
  console.log({ file, function: 'readArticle', doc });

  return articles.findOne(doc);
};

const updateArticle = (doc: LokiArticle): boolean => {
  console.log({ file, function: 'updateArticle', doc });

  return articles.update(doc);
};

export default {
  createArticle,
  readArticle,
  updateArticle,
};
