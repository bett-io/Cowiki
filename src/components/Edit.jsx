// @flow

import React from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';

const Edit = (props) => {
  const { pageId } = props;

  return (
    <div>
      <h1>Editing {pageId}</h1>
      <FormGroup>
        <FormControl
          type="text"
          value={pageId}
          placeholder="Enter title"
        />
        <FormControl componentClass="textarea" placeholder="textarea" />
      </FormGroup>
    </div>
  );
};

export default Edit;
