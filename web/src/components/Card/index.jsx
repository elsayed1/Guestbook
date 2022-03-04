import React from "react";

import "./styles.css";

const Card = ({ children, variant = "light", fullWidth, ...rest }) => {
  return (
    <div className={`card ${variant}`} {...rest}>
      {children}
    </div>
  );
};
export default Card;
