import React from 'react';
// import ReactGA from 'react-ga';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const ContactModal = ({ buttonLabel, modalBody, open, toggle }) => (
  <Modal isOpen={open} toggle={toggle}>
    <ModalHeader toggle={toggle}>{buttonLabel}</ModalHeader>
    <ModalBody>{modalBody}</ModalBody>
  </Modal>
);
export default ContactModal;

// const toggleRecord = () => {
//   // record interaction when button clicked
//   if (type === 'project') {
//     ReactGA.event({ category: 'Connections', action: 'Contacted Project', label: buttonLabel });
//   } else {
//     ReactGA.event({ category: 'Connections', action: 'Contacted Profile', label: buttonLabel });
//   }
//   setModal(!modalState);
// };
