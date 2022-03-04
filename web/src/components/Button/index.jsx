import React from "react";
import "./styles.css";
const Button = ({ children, variant, ...rest }) => {
  return (
    <button className={variant} {...rest}>
      {children}
    </button>
  );
};

export default Button;
