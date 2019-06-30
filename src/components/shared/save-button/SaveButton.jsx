/* eslint-disable react/button-has-type */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BlueButtonFilled } from '../../../design-language/design-language';

import styles from './SaveButton.module.css';

const SaveButton = ({ loading,
  success,
  error,
  className = 'defBtn',
  onClick,
  type = 'button',
  disabled = false,
  text = 'Save' }) => (
    <div>
      <BlueButtonFilled type={type} onClick={onClick} disabled={disabled}>
        {text}
      </BlueButtonFilled>
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
