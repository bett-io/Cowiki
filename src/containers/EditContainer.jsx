// @flow

import React from 'react';

import connectWithRouter from '../../modules/connectWithRouter';
import Edit from '../components/Edit';

const EditContainer = (props) => {
  const { pageId } = props.match.params;
  return (<Edit pageId={pageId}/>);
};

export default connectWithRouter(
  null,
  null,
)(EditContainer);
