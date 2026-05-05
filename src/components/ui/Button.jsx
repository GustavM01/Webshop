import React from "react";
import "./Button.css";
import { Loader2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function Button({
  disabled = false,
  children,
  onClick,
  style,
  loading,
  variant = "primary",
  to,
}) {
  if (to) {
    return (
      <Link to={to}>
        <button
          disabled={disabled}
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
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
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
