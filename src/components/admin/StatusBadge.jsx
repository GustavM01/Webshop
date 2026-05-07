import React from "react";
import "./StatusBadge.css";

function StatusBadge({ status, style }) {
  return (
    <div style={style} className="badge-container">
      <p className={status}>{status}</p>
    </div>
  );
}

export default StatusBadge;
