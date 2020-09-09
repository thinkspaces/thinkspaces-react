// Libraries
import React from "react";

// Components
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ContactModal = ({ buttonLabel, modalBody, open, toggle }) => (
  <Modal isOpen={open} toggle={toggle}>
    <ModalHeader toggle={toggle}>{buttonLabel}</ModalHeader>
    <ModalBody>{modalBody}</ModalBody>
  </Modal>
);

export default ContactModal;
