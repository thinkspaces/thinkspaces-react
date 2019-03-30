/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const ContactModal = ({ buttonLabel, className, modalBody, type }) => {
  const [ modalState, setModal ] = useState(false);

  const toggleRecord = () => {
    // record interaction when button clicked
    if (type === 'project') {
      ReactGA.event({ category: 'Connections', action: 'Contacted Project', label: buttonLabel });
    } else {
      ReactGA.event({ category: 'Connections', action: 'Contacted Profile', label: buttonLabel });
    }
    setModal(!modalState);
  };

  const toggle = () => {
    setModal(!modalState);
  };

  return (
    <div>
      <Button color="primary" onClick={toggleRecord}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modalState} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{buttonLabel}</ModalHeader>
        <ModalBody>{modalBody}</ModalBody>
      </Modal>
    </div>
  );
};

export default ContactModal;
