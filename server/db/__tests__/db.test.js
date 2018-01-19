// @Flow

import { createArticle, readArticle, updateArticle } from '../db'

describe('db', () => {
  test('readArticle should return null for non-exist article request', () => {
    const article = readArticle('nonExist');

    expect(article).toBeNull();
  });

  test('createArticle should insert the given article', () => {
    expect(createArticle('id1', 'hello world')).toBeTruthy();

    expect(readArticle('id1')).toMatchObject({ id: 'id1', content: 'hello world' });
  })

  test('updateArticle should update article in db', () => {
    expect(createArticle('id2', 'hello world')).toBeTruthy();
    expect(updateArticle('id2', 'hello world!!', 0)).toBeTruthy();

    expect(readArticle('id2')).toMatchObject({ id: 'id2', content: 'hello world!!' });
  })

  test('updateArticle should be failed when the given revision doesn\'t match', () => {
    expect(createArticle('id3', 'hello world')).toBeTruthy();
    expect(updateArticle('id3', 'hello world!!', 1)).toBeFalsy();
  })
});
