import React from 'react';
import styles from './Button.module.css';
import { ButtonText } from '../Typography/Typography'; 

const Button = ({ children, disabled = false, variant = 'primary', className, ...props }) => {
  let buttonClass;

  if (disabled) {
    buttonClass = styles.disabled;
  } 
  else {
    buttonClass = styles.primary;
  }

  return (
    <button
      className={`${buttonClass} ${className || ''}`}
      onClick={props.onClick}
      type={props.type || 'button'}
      disabled={disabled}
      {...props}
    >
      <ButtonText>{children}</ButtonText>
    </button>
  );
};

export default Button;