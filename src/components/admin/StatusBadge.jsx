import React from "react";
import "./StatusBadge.css";

function StatusBadge({ status }) {
  return (
    <div className="badge-container">
      <p className={status}>{status}</p>
    </div>
  );
}

export default StatusBadge;
