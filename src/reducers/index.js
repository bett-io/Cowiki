import { combineReducers } from 'redux';

function sessionCounter(state = { counter: 0 }) {
  // This value never changes from initial value which is given from server
  return state;
}

const userDefault = {
  id: undefined,
};

function user(state = userDefault, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return action.user;
    default:
      return state;
  }
}

const articles = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ARTICLE':
      return Object.assign({}, state, { [action.id]: action.article });
    default:
      return state;
  }
};

const reducer = combineReducers({
  sessionCounter,
  user,
  articles,
});

export default reducer;
