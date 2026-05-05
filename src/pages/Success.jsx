import React from "react";
import Button from "../components/ui/Button";

function Success() {
  return (
    <div className="center-text">
      <h2>Thank you for your order!</h2>

      <Button to={"/"}>Back to home</Button>
    </div>
  );
}

export default Success;
