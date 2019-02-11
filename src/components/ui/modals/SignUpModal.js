import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class SignUpModal extends Component {
  render() {
    const { isOpen, signUp, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign Up and Collaborate!</ModalHeader>
        <ModalBody>
          Thinkspaces would love to see your exciting ideas come to life. Create
          an account and start sharing!
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
  }
}
