import React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, AlertCircle } from "lucide-react";
import UserRow from "./UserRow";

export default function UserTable({
  users = [],
  onEdit,
  onDelete,
  sortField,
  sortOrder,
  onSortChange
}) {
  const handleSort = (field) => {
    onSortChange(field);
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <ChevronsUpDown size={14} style={{ opacity: 0.5 }} />;
    }
    return sortOrder === "asc" ? (
      <ChevronUp size={14} style={{ color: "var(--primary)" }} />
    ) : (
      <ChevronDown size={14} style={{ color: "var(--primary)" }} />
    );
  };

  return (
    <div className="table-card glass-panel">
      <div className="table-responsive">
        {users.length === 0 ? (
          <div className="empty-state">
            <AlertCircle className="empty-state-icon" />
            <h2>No Employees Found</h2>
            <p>
              We couldn't find any employees matching your current search query or filter settings.
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th
                  className="sortable"
                  onClick={() => handleSort("id")}
                  style={{ width: "80px" }}
                >
                  ID
                  <span className="sort-icon-wrapper">{renderSortIcon("id")}</span>
                </th>
                <th className="sortable" onClick={() => handleSort("firstName")}>
                  Employee
                  <span className="sort-icon-wrapper">{renderSortIcon("firstName")}</span>
                </th>
                <th className="sortable" onClick={() => handleSort("email")}>
                  Email
                  <span className="sort-icon-wrapper">{renderSortIcon("email")}</span>
                </th>
                <th className="sortable" onClick={() => handleSort("department")}>
                  Department
                  <span className="sort-icon-wrapper">
                    {renderSortIcon("department")}
                  </span>
                </th>
                <th className="sortable" onClick={() => handleSort("role")}>
                  Role
                  <span className="sort-icon-wrapper">{renderSortIcon("role")}</span>
                </th>
                <th className="sortable" onClick={() => handleSort("status")}>
                  Status
                  <span className="sort-icon-wrapper">{renderSortIcon("status")}</span>
                </th>
                <th style={{ width: "100px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
