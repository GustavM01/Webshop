import React, { useState } from "react";
import "./NumberInput.css";
import { Minus, Plus } from "lucide-react";

function NumberInput({ value, onIncrease, onDecrease }) {
  const size = 16;
  return (
    <div className="input-container">
      <button
        disabled={value <= 1}
        onClick={onDecrease}
        className="input-btn decrease"
      >
        <Minus color="white" size={size} />
      </button>
      <p>{value}</p>
      <button
        disabled={value >= 10}
        onClick={onIncrease}
        className="input-btn increase"
      >
        <Plus color="white" size={size} />
      </button>
    </div>
  );
}

export default NumberInput;
