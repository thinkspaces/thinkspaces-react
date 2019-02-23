/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { db } from '../../firebase';

const modal = ({ buttonLabel, className, modalBody, projectId }) => {
  const [ modalState, setModal ] = useState(false);

  const toggleRecord = async () => {
    // record interaction when button clicked
    setModal(!modalState);
    await db.recordInteraction(projectId)
  }

  const toggle = () => {
    setModal(!modalState);
  }

  return (
    <div>
      <Button color="danger" onClick={toggleRecord}>{buttonLabel}</Button>
      <Modal isOpen={modalState} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{buttonLabel}</ModalHeader>
        <ModalBody>
          {modalBody}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default modal;
