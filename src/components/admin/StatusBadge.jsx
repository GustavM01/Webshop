import "./StatusBadge.css";

function StatusBadge({ status, style, edit, onChange }) {
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
            value={status}
            onChange={(e) => onChange(e.target.value)}
            className={status}
            name="statusBadge"
          >
            {statuses.map((s) => (
              <option className={s} key={s} value={s}>
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
