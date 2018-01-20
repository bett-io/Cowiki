// @flow

import React from 'react';

import { FormGroup, FormControl, Tabs, Tab, Button } from 'react-bootstrap';

export type EditProps = {
  pageId: string,
  content: string,
  revision: number,
  onSubmit: (string, number) => void,
}

const Edit = (props: EditProps) => {
  const { pageId, content, revision, onSubmit } = props;
  let title;
  let updatedContent = content;

  const handleSubmit = () => {
    onSubmit(updatedContent, revision);
  };

  const handleTitleChange = (e) => {
    title = e.target.value;
  };

  const handleContentChange = (e) => {
    updatedContent = e.target.value;
  };

  return (
    <div>
      <h1>Editing {pageId}</h1>
      <FormGroup>
        <FormControl type="text" value={pageId} placeholder="Enter title"
          onChange={handleTitleChange} />
        <br/>
        <Tabs defaultActiveKey={1} id="write-preview">
          <Tab eventKey={1} title="Write">
            <FormControl componentClass="textarea" rows={15} defaultValue={updatedContent}
              onChange={handleContentChange} />
          </Tab>
          <Tab eventKey={2} title="Preview">
            Preview placeholder
          </Tab>
        </Tabs>
        <br/>
        <h5>Edit Message</h5>
        <FormControl type="text" placeholder="Write a small message here explaining this change. (Optional)" />
        <br/>
        <Button className="pull-right" bsStyle="success" onClick={handleSubmit}>Save Page</Button>
      </FormGroup>
    </div>
  );
};

export default Edit;
