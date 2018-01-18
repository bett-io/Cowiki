// @flow

import assert from 'assert';
import db from '../db/db';

import type { Article } from '../db/db.flow';

const file = 'server/apis/article.js';

const create = async (id: string, content: string): boolean => {
  return db.createArticle({ id, content, rev: 0 });
}

const read = async (id: string): ?Article => {
  return db.readArticle({ id });
}

const update = async (id: string, content: string, currentRev: number): boolean => {
  const article = await read(id);

  assert(currentRev >= 0);

  if (article.rev !== currentRev) return false;

  return db.updateArticle(Object.assign({}, article, { content, rev: currentRev + 1 }))
}

module.exports = {
  create,
  read,
  update,
};
