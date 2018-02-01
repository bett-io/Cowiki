// @flow

export type User = {
  id: string,
};

export const updateUser = (user: User) => ({
  type: 'UPDATE_USER',
  user,
});

/*
export const updateUser = (user: User) => async (dispatch: Function) => {
  dispatch({
    type: 'UPDATE_USER',
    user,
  });
};
*/
