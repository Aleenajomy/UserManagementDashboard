import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

export default function ConfirmDelete({ isOpen, onClose, onConfirm, userName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-dialog-content">
        <div className="modal-header" style={{ borderBottom: "none", marginBottom: "0" }}>
          <h2>Delete User</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="delete-warn-icon">
          <AlertTriangle size={32} />
        </div>

        <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "8px" }}>
          Are you sure you want to delete <span style={{ color: "var(--danger)", fontWeight: "600" }}>{userName}</span>?
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          This action is permanent and cannot be undone. The user's account details will be completely wiped from the register.
        </p>

        <div className="delete-dialog-buttons">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            <Trash2 size={16} />
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
