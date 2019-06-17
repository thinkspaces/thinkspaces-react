import React from 'react';

const CreateButton = ({ children, onClick }) => (
  <button type="button" className="defBtn" onClick={onClick}>
    {children}
  </button>
);

export default CreateButton;
