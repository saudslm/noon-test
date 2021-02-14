import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Alert = props => {

  const { type = 'warning', message } = props;

  return message && message.length > 0 ? (
    <div className={"alert alert-" + type}>{message}</div>
  ) : '';
};

// prop types
Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};

export default Alert;