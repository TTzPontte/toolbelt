import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const LoadingIndicator = ({ isFull = false }) => {
  let classNameWrap = "wrap-loading-indicator";

  if (isFull) {
    classNameWrap += " full";
  }

  return (
    <div className={classNameWrap}>
      <div className="loading-indicator">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

LoadingIndicator.propTypes = {
  isFull: PropTypes.string,
};

export default LoadingIndicator;
