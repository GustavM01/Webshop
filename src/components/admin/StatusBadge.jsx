import React, { useEffect, useState } from "react";
import "./StatusBadge.css";

function StatusBadge({ status, style, edit, onChange }) {
  const [selectedValue, setSelectedValue] = useState(status);

  useEffect(() => {
    setSelectedValue(status);
  }, [status]);

  const statuses = [
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  return (
    <>
      {!edit ? (
        <div style={style} className="badge-container">
          <p className={status}>{status}</p>
        </div>
      ) : (
        <div style={style} className="badge-container">
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className={selectedValue}
            name="statusBadge"
          >
            {statuses.map((s, index) => (
              <option key={index} className={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

export default StatusBadge;
