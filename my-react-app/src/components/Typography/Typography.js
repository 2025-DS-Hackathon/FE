import React from 'react';
import styles from './Typography.module.css';

export const Headline1 = ({ children, className, ...props }) => (
  <h2 className={`${styles.headline1} ${className || ''}`} {...props}>
    {children}
  </h2>
);

export const Headline2 = ({ children, className, ...props }) => (
  <h3 className={`${styles.headline2} ${className || ''}`} {...props}>
    {children}
  </h3>
);

export const Headline3 = ({ children, className, ...props }) => (
  <h4 className={`${styles.headline3} ${className || ''}`} {...props}>
    {children}
  </h4>
);

export const Body1 = ({ children, className, ...props }) => (
  <p className={`${styles.body1} ${className || ''}`} {...props}>
    {children}
  </p>
);

export const Body2 = ({ children, className, ...props }) => (
  <p className={`${styles.body2} ${className || ''}`} {...props}>
    {children}
  </p>
);

export const ButtonText = ({ children, className, ...props }) => (
  <span className={`${styles.buttonText} ${className || ''}`} {...props}>
    {children}
  </span>
);

export const TabText = ({ children, className, ...props }) => (
  <span className={`${styles.tabText} ${className || ''}`} {...props}>
    {children}
  </span>
);

export const CaptionText = ({ children, className, ...props }) => (
  <span className={`${styles.caption1} ${className || ''}`} {...props}>
    {children}
  </span>
);