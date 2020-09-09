// Libraries
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import Button from "components/shared/button";

// Styles
import styles from "components/shared/save-button/styles.css";

const SaveButton = ({
  loading,
  success,
  onClick,
  type = "button",
  disabled = false,
  text = "Save",
}) => (
  <div className={styles.save}>
    <Button
      type={type}
      variant="filled"
      color="#384EFA"
      onClick={onClick}
      disabled={disabled}
    >
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
