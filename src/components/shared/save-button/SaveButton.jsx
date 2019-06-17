/* eslint-disable react/button-has-type */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SaveButton.module.css';

const SaveButton = (
  { loading,
    success,
    error,
    className = 'defBtn',
    onClick,
    type = 'button',
    disabled = false,
    text = 'Save' },
) => (
  <div className={styles.save}>
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      { text }
    </button>
    {
        loading ? (
          <div className="fade-in-animation">
            <FontAwesomeIcon icon="circle-notch" spin />
          </div>
        ) : null
    }
    {
        success ? (
          <div className="fade-in-animation">
            <FontAwesomeIcon icon="check-circle" />
          </div>
        ) : null
    }
  </div>
)

export default SaveButton
