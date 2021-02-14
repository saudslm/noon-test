import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const InputText = props => {
  const { attr, onChange, id, name, className, label, value } = props;

  return (
    <div {...attr} className="input-field">
      <input type="text" onChange={onChange} value={value} id={id} name={name} className={className} />
      <label>{label}</label>
    </div>
  );
};

// prop types
InputText.propTypes = {
  attr: PropTypes.object,
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string
};

export default InputText;