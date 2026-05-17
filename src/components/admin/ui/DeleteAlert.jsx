import React from "react";
import "./DeleteAlert.css";
import Button from "../../ui/Button";
import { CircleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function DeleteAlert({ onConfirm, onCancel, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="alert-wrapper">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeIn" }}
            exit={{ opacity: 0, y: -10 }}
            className="alert-section"
          >
            <CircleAlert color="red" strokeWidth={2} size={50} />
            <h2>Are you sure you want to delete this order?</h2>
            <p>This action cannot be undone.</p>
            <div style={{ gap: 30 }} className="flex-row">
              <Button onClick={onCancel}>Cancel</Button>
              <Button style={{ background: "red" }} onClick={onConfirm}>
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default DeleteAlert;
