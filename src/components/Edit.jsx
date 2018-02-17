// @flow

import React, { Component } from 'react';

import marked from 'marked';
import {
  FormGroup,
  FormControl,
  Tabs,
  Tab,
  Button,
} from 'react-bootstrap';

export type EditProps = {
  pageId: string,
  content: string,
  revision: number,
  onSubmit: (string, number, string) => void,
}

type State = {
  preview: string,
}

class Edit extends Component<EditProps, State> {
  content: string;
  title: string;
  changeNote: string,
  handleSubmit: () => void;
  handleSelect: (number) => void;
  handleTitleChange: (SyntheticEvent<HTMLInputElement>) => void;
  handleContentChange: (SyntheticEvent<HTMLInputElement>) => void;
  handleNoteChange: (SyntheticEvent<HTMLInputElement>) => void;

  constructor(props: EditProps) {
    super(props);
    const { content, pageId } = this.props;
    this.content = content;
    this.title = pageId;
    this.state = {
      preview: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  getPreview() {
    return this.content ? marked(this.content) : '';
  }

  handleSubmit() {
    this.props.onSubmit(this.content, this.props.revision, this.changeNote);
  }

  handleSelect(key: number) {
    // 2 is preview.
    if (key === 2) {
      this.setState({ preview: this.getPreview() });
    }
  }

  handleTitleChange(e: SyntheticEvent<HTMLInputElement>) {
    this.title = e.currentTarget.value;
  }

  handleContentChange(e: SyntheticEvent<HTMLInputElement>) {
    this.content = e.currentTarget.value;
  }

  handleNoteChange(e: SyntheticEvent<HTMLInputElement>) {
    this.changeNote = e.currentTarget.value;
  }

  render() {
    const { pageId, content } = this.props;

    return (
      <div>
        <h1>Editing {pageId}</h1>
        <FormGroup>
          <FormControl
            type="text"
            value={this.title}
            placeholder="Enter title"
            onChange={this.handleTitleChange}
          />
          <br />
          <Tabs
            defaultActiveKey={1}
            id="write-preview"
            onSelect={this.handleSelect}
          >
            <Tab eventKey={1} title="Write">
              <FormControl
                componentClass="textarea"
                rows={15}
                defaultValue={content}
                onChange={this.handleContentChange}
              />
            </Tab>
            <Tab eventKey={2} title="Preview">
              <div dangerouslySetInnerHTML={{ __html: this.state.preview }} />
            </Tab>
          </Tabs>
          <br />
          <h5>Edit Message</h5>
          <FormControl
            type="text"
            placeholder="Write a small message here explaining this change. (Optional)"
            onChange={this.handleNoteChange}
          />
          <br />
          <Button className="pull-right" bsStyle="success" onClick={this.handleSubmit}>
            Save Page
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default Edit;
