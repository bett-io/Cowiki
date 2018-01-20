// @flow

import assert from 'assert';
import db from '../db/db';

import type { Article } from '../db/db.flow';

const create = async (id: string, content: string): Promise<boolean> => db.createArticle({
  id,
  content,
  rev: 0,
});

const read = async (id: string): Promise<?Article> => db.readArticle({ id });

const update = async (id: string, content: string, currentRev: number): Promise<any> => {
  const article = await read(id);

  assert(currentRev >= 0);

  if (!article || article.rev !== currentRev) return false;

  return db.updateArticle(Object.assign({}, article, { content, rev: currentRev + 1 }));
};

module.exports = {
  create,
  read,
  update,
};
