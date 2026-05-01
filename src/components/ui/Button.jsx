import React from "react";
import "./Button.css";
import { Loader2, Trash2 } from "lucide-react";

function Button({ children, onClick, style, loading, variant = "primary" }) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={
        loading ? `btn btn-${variant} loading-btn` : `btn btn-${variant}`
      }
    >
      {variant === "remove" && (
        <Trash2 size={20} color="white" strokeWidth={1.8} />
      )}
      {loading ? <Loader2 className="loading-icon" /> : children}
    </button>
  );
}

export default Button;
