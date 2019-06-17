import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatusIndicator = ({ available, searching }) => {
  if (searching) {
    return <FontAwesomeIcon icon="circle-notch" spin />;
  }
  if (available) {
    return <FontAwesomeIcon icon="check-circle" />;
  }
  return <FontAwesomeIcon icon="times-circle" />;
};

export default StatusIndicator;
