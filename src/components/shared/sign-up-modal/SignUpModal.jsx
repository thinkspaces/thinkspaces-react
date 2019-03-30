import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const SignUpModal = ({ isOpen, signUp, toggle }) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>Sign Up/Login and Collaborate!</ModalHeader>
    <ModalBody>
      Thinkspaces would love to see your exciting ideas come to life. Create an account and start
      sharing!
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={signUp}>
        Login/Sign Up
      </Button>
      <Button color="secondary" onClick={toggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);

export default SignUpModal;
