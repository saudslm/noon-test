import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Button = props => {
  const { type = 'button', block = false, className = '', id = '', children} = props;

  return (
    <button 
    type={type || 'button'} 
    className={'button ' + (block ? 'button-block ' : '') + (className ? className : '')} 
    id={id}
    >{children}</button>
  )
};

// prop types
Button.propTypes = {
  type: PropTypes.string,
  block: PropTypes.bool,
  id: PropTypes.string,
  className: PropTypes.string
};

export default Button;