/* eslint-disable react/button-has-type */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../button';

import styles from './SaveButton.module.css';

const SaveButton = ({
  loading,
  success,
  error,
  className = 'defBtn',
  onClick,
  type = 'button',
  disabled = false,
  text = 'Save',
}) => (
  <div className={styles.save}>
    <Button type={type} variant="filled" color="#384EFA" onClick={onClick} disabled={disabled}>
      {text}
    </Button>
    {loading ? (
      <div className="fade-in-animation">
        <FontAwesomeIcon icon="circle-notch" spin />
      </div>
    ) : null}
    {success ? (
      <div className="fade-in-animation">
        <FontAwesomeIcon icon="check-circle" />
      </div>
    ) : null}
  </div>
);

export default SaveButton;
