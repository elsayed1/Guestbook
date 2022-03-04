import React from "react";

const Grid = ({ direction, space, children, justifyContent, alignItems }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap: space,
        justifyContent: justifyContent,
        alignItems: alignItems,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
