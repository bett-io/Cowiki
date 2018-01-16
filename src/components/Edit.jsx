// @flow

import React from 'react';

import { FormGroup, FormControl, Tabs, Tab, Button } from 'react-bootstrap';

const Edit = (props) => {
  const { pageId } = props;

  return (
    <div>
      <h1>Editing {pageId}</h1>
      <FormGroup>
        <FormControl type="text" value={pageId} placeholder="Enter title" />
        <br/>
        <Tabs defaultActiveKey={1} id="write-preview">
          <Tab eventKey={1} title="Write">
            <FormControl componentClass="textarea" rows={15} />
          </Tab>
          <Tab eventKey={2} title="Preview">
            Preview placeholder
          </Tab>
        </Tabs>
        <br/>
        <h5>Edit Message</h5>
        <FormControl type="text" placeholder="Write a small message here explaining this change. (Optional)" />
        <br/>
        <Button className="pull-right" bsStyle="success">Save Page</Button>
      </FormGroup>
    </div>
  );
};

export default Edit;
