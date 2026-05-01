import React from "react";
import "./Button.css";

function Button({ children, onClick, style, variant = "primary" }) {
  return (
    <button onClick={onClick} style={style} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}

export default Button;
