/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CantLikeModal = ({ isOpen, signUp, toggle }) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>Sign Up/Login to like projects</ModalHeader>
    <ModalBody>
      We're so happy to see you're interested in this project! Sign up or Login to like projects to
      your heart's content!
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

export default CantLikeModal;
