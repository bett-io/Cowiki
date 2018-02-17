// @flow

import assert from 'assert';
import db from '../db/db';
import { createPatch } from 'diff';

import type { Article } from '../db/db.flow';

const file = '/server/apis/article.js';

const create = async (
  id: string,
  content: string,
  uid: string,
  ip: string,
): Promise<boolean> => db.createArticle({
  id,
  content,
  rev: 0,
  lastDate: Date.now(),
  lastUser: uid,
  lastIp: ip,
});

const read = async (id: string): Promise<?Article> => {
  const article = await db.readArticle({ id });

  return article || { id, rev: -1 };
};

const update = async (
  id: string,
  content: string,
  currentRev: number,
  uid: string,
  ip: string,
  note: string,
): Promise<any> => {
  const article = await read(id);
  const func = 'update';

  console.log({ file, func, id, content, currentRev, uid, ip, note });

  assert(currentRev >= 0);

  if (!article || article.rev !== currentRev) return false;

  const change = createPatch(id, article.content, content, currentRev, currentRev + 1);

  console.log({ file, func, change });

  const date = Date.now();

  const updateArticle = db.updateArticle(Object.assign({}, article, {
    content,
    rev: currentRev + 1,
    lastDate: date,
    lastUser: uid,
    lastIp: ip,
  }));

  // Don't include note to doc if it is zero length string because DynamoDB considers it is invalid.
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property
  const noteObj = note ? { note } : {};
  const doc = Object.assign({}, {
    id: article.id,
    rev: currentRev + 1,
    uid,
    date,
    ip,
    change,
  }, noteObj);

  const createChange = db.createChange(doc);

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
