// @flow

// This DB is only for development.

import assert from 'assert';
import loki from 'lokijs';

import type { Article } from './db.flow.js';

const db = new loki('local.db');
const articles = db.addCollection('article');

const createArticle = (id: string, content: string): boolean => {
  console.log(id);
  return articles.insert({ id, content, rev: 0 });
}

const readArticle = (id: string): ?Article => {
  return articles.findOne({ 'id': id });
}

const updateArticle = (id: string, content: string, currentRev: number): boolean => {
  const article = articles.findOne({ id });

  assert(currentRev >= 0);

  if (article.rev !== currentRev) return false;

  return articles.update(Object.assign({}, article, { content, rev: currentRev + 1 }));
}

export default {
  createArticle,
  readArticle,
  updateArticle,
}
