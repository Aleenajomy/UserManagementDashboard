import React, { useState, useRef, useEffect } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { DEPARTMENTS, ROLE_OPTIONS, STATUS_OPTIONS } from "../utils/constants";

export default function FilterPopup({
  selectedRole,
  setSelectedRole,
  selectedStatus,
  setSelectedStatus,
  selectedDepartment,
  setSelectedDepartment,
  onClearFilters
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Count active filters
  const activeCount = [
    selectedRole ? 1 : 0,
    selectedStatus ? 1 : 0,
    selectedDepartment ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="filter-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className={`btn btn-secondary ${activeCount > 0 ? "active-filters" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={16} />
        Filter
        {activeCount > 0 && (
          <span className="filter-badge-count">{activeCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="filter-popup-card glass-panel">
          <h3>Filter Directory</h3>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-control"
              value={selectedRole || ""}
              onChange={(e) => setSelectedRole(e.target.value || null)}
            >
              <option value="">All Roles</option>
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={selectedStatus || ""}
              onChange={(e) => setSelectedStatus(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              className="form-control"
              value={selectedDepartment || ""}
              onChange={(e) => setSelectedDepartment(e.target.value || null)}
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClearFilters}
              disabled={activeCount === 0}
              style={{ padding: "8px 12px", fontSize: "13px" }}
            >
              <RotateCcw size={14} />
              Reset All
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsOpen(false)}
              style={{ padding: "8px 16px", fontSize: "13px" }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
