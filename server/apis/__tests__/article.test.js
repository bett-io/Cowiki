// @Flow

import { create, read, update } from '../article';
import db from '../../db/db';

describe('article', () => {
  beforeEach(() => {
    db.init(true);
  });

  test('read should return null for non-exist article request', () => {
    expect.assertions(1);
    return read('nonExist').then((result) => {
      expect(result).toBeNull();
    });
  });

  test('create should insert the given article', () => {
    expect.assertions(2);

    return create('id1', 'hello world').then((ret) => {
      expect(ret).toBeTruthy();

      return read('id1');
    }).then((ret) => {
      expect(ret).toMatchObject({ id: 'id1', content: 'hello world' });
    });
  });

  test('update should update article in db', () => {
    expect.assertions(3);

    return create('id2', 'hello world').then((result) => {
      expect(result).toBeTruthy();

      return update('id2', 'hello world!!', 0);
    }).then((result) => {
      expect(result).toBeTruthy();

      return read('id2');
    }).then((result) => {
      expect(result).toMatchObject({ id: 'id2', content: 'hello world!!' });
    });
  });

  test('update should be failed when the given revision doesn\'t match', () => {
    expect.assertions(2);

    return create('id3', 'hello world').then((result) => {
      expect(result).toBeTruthy();

      return update('id3', 'hello world!!', 1);
    }).then((result) => {
      expect(result).toBeFalsy();
    });
  });
});
