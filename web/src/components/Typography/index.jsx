import React from "react";

import "./styles.css";

const Typography = ({ variant, children, className, color }) => {
  return (
    <p style={{ color }} className={`${variant} ${className}`}>
      {children}
    </p>
  );
};

export default Typography;
