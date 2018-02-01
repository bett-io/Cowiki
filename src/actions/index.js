import facebook from './facebook';

export const initializeApp = () => () => {
  facebook.initialize();
};
