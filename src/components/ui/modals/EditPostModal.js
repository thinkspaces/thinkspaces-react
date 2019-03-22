import React from 'react';
import { Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input } from 'reactstrap';

const EditPostModal = ({ post, onSavePost, description, onChange, editable, toggle }) => (
  <Modal isOpen={editable} toggle={toggle} keyboard={false} backdrop="static">
    <ModalHeader>Edit post</ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup>
          <Input value={description} onChange={onChange} type="textarea" />
        </FormGroup>
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={onSavePost}>
        Save
      </Button>
      <Button color="secondary" onClick={toggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);

export default EditPostModal;
