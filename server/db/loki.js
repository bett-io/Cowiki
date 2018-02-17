// @flow

// This DB is only for development.

import loki from 'lokijs';

import type {
  CreateArticle,
  ReadArticle,
  UpdateArticle,
  Article,
  CreateUser,
  ReadUser,
  User,
  CreateChange,
  ReadChange,
  Change,
} from './db.flow';

const db = new loki('local.db');
const articles = db.addCollection('article');
const users = db.addCollection('user');

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

const createUser = (doc: CreateUser): boolean => {
  console.log({ file, function: 'createUser', doc });

  return users.insert(doc);
};

const readUser = (doc: ReadUser): ?User => {
  console.log({ file, function: 'readUser', doc });

  return users.findOne(doc);
};

const createChange = (doc: CreateChange): boolean => {
  console.log({ file, function: 'createChange', doc });

  return users.insert(doc);
};

const readChange = (doc: ReadChange): ?Change => {
  console.log({ file, function: 'readChange', doc });

  return users.findOne(doc);
};

export default {
  createArticle,
  readArticle,
  updateArticle,
  createUser,
  readUser,
  createChange,
  readChange,
};
