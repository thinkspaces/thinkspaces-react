/* eslint camelcase: 0 */
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

const FinishProfileModal = ({ isOpen, onClose, toggle, profile, onChange }) => (
  <Modal isOpen={isOpen} toggle={toggle} keyboard={false} backdrop="static">
    <ModalHeader>Complete Your Profile!</ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup>
          <Label for="preferred_name">Preferred Name</Label>
          <Input id="preferred_name" value={profile.preferred_name} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="major">Major</Label>
          <Input id="major" value={profile.major} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="university">College or Grad School</Label>
          <Input id="university" value={profile.university} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="graduation">Graduation Year</Label>
          <Input id="graduation" value={profile.graduation} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="headline">Short Bio</Label>
          <Input id="headline" value={profile.headline} onChange={onChange} />
        </FormGroup>
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={onClose}>
        Save
      </Button>
      <Button color="secondary" onClick={onClose}>
        Dismiss
      </Button>
    </ModalFooter>
  </Modal>
);

export default FinishProfileModal;
