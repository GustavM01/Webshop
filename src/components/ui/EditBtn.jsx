import React from "react";
import "./EditBtn.css";

function EditBtn({ onClick, editing }) {
  return (
    <button onClick={onClick} className="edit-btn">
      {!editing ? "Edit" : "Cancel"}
    </button>
  );
}

export default EditBtn;
