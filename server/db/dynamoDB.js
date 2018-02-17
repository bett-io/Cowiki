// @flow

import AWS from 'aws-sdk';

import type {
  Article,
  CreateArticle,
  ReadArticle,
  UpdateArticle,
  User,
  CreateUser,
  ReadUser,
  Change,
  CreateChange,
  ReadChange,
} from './db.flow';

const file = 'server/db/dynamoDB.js';
const articleTableName = 'article';
const userTableName = 'user';
const changeTableName = 'change';

let awsRegion = '';
let docClientInstance = null;

const init = (region: string) => {
  awsRegion = region;
};

const docClient = (): Object => {
  if (!docClientInstance) {
    AWS.config.update({
      region: awsRegion,
    });

    docClientInstance = new AWS.DynamoDB.DocumentClient();
  }

  return docClientInstance;
};

const createArticle = async (doc: CreateArticle): Promise<Article> => {
  console.log({ file, function: 'createArticle', doc });

  const params = {
    TableName: articleTableName,
    Item: doc,
  };

  return docClient().put(params).promise();
};

type ArticleQueryResult = { Items: Array<Article>, Count: number, ScannedCount: number };

const readArticle = async (doc: ReadArticle): Promise<Article> => {
  const func = 'readArticle';

  console.log({ file, func, doc });

  const params = {
    TableName: articleTableName,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': doc.id,
    },
  };

  try {
    const result: ArticleQueryResult = await docClient().query(params).promise();
    return result.Items[0];
  } catch (e) {
    console.error({ file, func, error: e });
    return {};
  }
};

const updateArticle = (doc: UpdateArticle): Promise<Article> => {
  console.log({ file, function: 'updateArticle', doc });

  const params = {
    TableName: articleTableName,
    Item: doc,
  };

  return docClient().put(params).promise();
};

const createUser = async (doc: CreateUser): Promise<User> => {
  console.log({ file, func: 'createUser', doc });

  const params = {
    TableName: userTableName,
    Item: doc,
  };

  return docClient().put(params).promise();
};

type UserQueryResult = { Items: Array<User>, Count: number, ScannedCount: number };

const readUser = async (doc: ReadUser): Promise<User> => {
  const func = 'readUser';

  console.log({ file, func, doc });

  const params = {
    TableName: userTableName,
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': doc.id,
    },
  };

  try {
    const result: UserQueryResult = await docClient().query(params).promise();
    console.log({ file, func, result });
    return result.Items[0];
  } catch (e) {
    console.error({ file, func, error: e });
    return {};
  }
};

const createChange = async (doc: CreateChange): Promise<Change> => {
  console.log({ file, func: 'createChange', doc });

  const params = {
    TableName: changeTableName,
    Item: doc,
  };

  return docClient().put(params).promise();
};

type ChangeQueryResult = { Items: Array<Change>, Count: number, ScannedCount: number };

const readChange = async (doc: ReadChange): Promise<Change> => {
  const func = 'readChange';

  console.log({ file, func, doc });

  const params = {
    TableName: changeTableName,
    KeyConditionExpression: 'id = :id and rev = :rev',
    ExpressionAttributeValues: {
      ':id': doc.id,
      ':rev': doc.rev,
    },
  };

  try {
    const result: ChangeQueryResult = await docClient().query(params).promise();
    return result.Items[0];
  } catch (e) {
    console.error({ file, func, error: e });
    return {};
  }
};

export default {
  init,
  createArticle,
  readArticle,
  updateArticle,
  createUser,
  readUser,
  createChange,
  readChange,
};
