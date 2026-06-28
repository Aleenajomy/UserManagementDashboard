import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export default function UserRow({ user, onEdit, onDelete }) {
  const { id, firstName, lastName, email, department, role, status } = user;

  // Generate initials for avatar
  const getInitials = () => {
    const first = firstName ? firstName.charAt(0) : "";
    const last = lastName ? lastName.charAt(0) : "";
    return (first + last).toUpperCase() || "?";
  };

  // Get status badge class
  const getStatusBadgeClass = (statusStr) => {
    switch (statusStr) {
      case "Active":
        return "badge-success";
      case "Inactive":
        return "badge-danger";
      case "Pending":
        return "badge-warning";
      default:
        return "";
    }
  };

  return (
    <tr>
      <td>
        <span style={{ fontWeight: "600", color: "var(--text-muted)", fontSize: "14px" }}>
          #{id}
        </span>
      </td>
      <td>
        <div className="user-info-cell">
          <div className="user-avatar" title={`${firstName} ${lastName}`}>
            {getInitials()}
          </div>
          <div className="user-details">
            <span className="user-name">
              {firstName} {lastName}
            </span>
            <span className="user-email-sub">{email}</span>
          </div>
        </div>
      </td>
      <td>
        <span style={{ fontSize: "14px", fontWeight: "500" }}>{email}</span>
      </td>
      <td>
        <span style={{ fontWeight: "500" }}>{department}</span>
      </td>
      <td>
        <span style={{ fontWeight: "500", color: "var(--text-secondary)" }}>
          {role}
        </span>
      </td>
      <td>
        <span className={`badge ${getStatusBadgeClass(status)}`}>
          {status}
        </span>
      </td>
      <td>
        <div className="actions-cell">
          <button
            type="button"
            className="btn-icon edit"
            onClick={() => onEdit(user)}
            title="Edit User"
          >
            <Edit2 size={16} />
          </button>
          <button
            type="button"
            className="btn-icon delete"
            onClick={() => onDelete(user)}
            title="Delete User"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
