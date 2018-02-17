// @flow

import assert from 'assert';
import db from '../db/db';
import { createPatch } from 'diff';

import type { Article } from '../db/db.flow';

const file = '/server/apis/article.js';

const create = async (id: string, content: string): Promise<boolean> => db.createArticle({
  id,
  content,
  rev: 0,
});

const read = async (id: string): Promise<?Article> => {
  const article = await db.readArticle({ id });

  return article || { id, rev: -1 };
};

const update = async (id: string, content: string, currentRev: number): Promise<any> => {
  const article = await read(id);

  assert(currentRev >= 0);

  if (!article || article.rev !== currentRev) return false;

  const change = createPatch(id, article.content, content, currentRev, currentRev + 1);

  console.log({ file, func: 'update', change });

  const updateArticle = db.updateArticle(Object.assign({}, article, {
    content,
    rev: currentRev + 1,
  }));
  const createChange = db.createChange({
    id: article.id,
    rev: currentRev + 1,
    change,
  });

  return new Promise((resolve, reject) => {
    Promise.all([updateArticle, createChange])
      .then(results => resolve(results[0]))
      .catch(reject);
  });
};

module.exports = {
  create,
  read,
  update,
};
