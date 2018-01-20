// @flow

import AWS from 'aws-sdk';

import type { CreateArticle, ReadArticle, UpdateArticle, Article } from './db.flow';

const file = 'server/db/dynamoDB.js';
const articleTableName = 'article';

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

type QueryResult = { Items: Array<Article>, Count: number, ScannedCount: number };

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
    const result: QueryResult = await docClient().query(params).promise();
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

export default {
  init,
  createArticle,
  readArticle,
  updateArticle,
};
