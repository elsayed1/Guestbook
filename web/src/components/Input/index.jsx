import React from "react";
import Typography from "../Typography";

import "./styles.css";

const Input = ({
  value,
  label,
  placeholder,
  type,
  onChange,
  id,
  error,
  variant,
  ...rest
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <div style={{ width: "inherit" }}>
        <input
          multiple
          id={id}
          type={type}
          value={value}
          className={variant}
          placeholder={placeholder}
          onChange={handleChange}
          {...rest}
        />
        {error && (
          <Typography variant="inputError" className="error">
            {error}
          </Typography>
        )}
      </div>
    </div>
  );
};

Input.defaultProps = {
  variant: "rounded",
};

export default Input;
