import React from 'react';
import { Button } from 'reactstrap';

const EditProjectButton = ({ isOwner, onEdit }) => (
  <div style={{ marginTop: 20 }}>
    {isOwner && (
      <Button color="danger" onClick={onEdit}>
        Edit Project
      </Button>
    )}
  </div>
);

export default EditProjectButton;
