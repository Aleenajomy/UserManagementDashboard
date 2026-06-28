import React, { useState, useEffect } from "react";
import { X, Save, ShieldAlert } from "lucide-react";
import { validateForm } from "../utils/validators";
import { DEPARTMENTS, ROLE_OPTIONS, STATUS_OPTIONS } from "../utils/constants";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
  role: "Viewer",
  status: "Pending"
};

export default function UserForm({ isOpen, onClose, onSubmit, user = null }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Populate form if editing
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        department: user.department || "",
        role: user.role || "Viewer",
        status: user.status || "Pending"
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear field error as user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  const isEditMode = !!user;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isEditMode ? "Edit Employee Details" : "Add New Employee"}</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-control ${errors.firstName ? "error" : ""}`}
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && (
                <span className="error-message">
                  <ShieldAlert size={14} />
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`form-control ${errors.lastName ? "error" : ""}`}
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && (
                <span className="error-message">
                  <ShieldAlert size={14} />
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? "error" : ""}`}
              placeholder="john.doe@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="error-message">
                <ShieldAlert size={14} />
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              className={`form-control ${errors.department ? "error" : ""}`}
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <span className="error-message">
                <ShieldAlert size={14} />
                {errors.department}
              </span>
            )}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="role">System Role</label>
              <select
                id="role"
                name="role"
                className={`form-control ${errors.role ? "error" : ""}`}
                value={formData.role}
                onChange={handleChange}
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <span className="error-message">
                  <ShieldAlert size={14} />
                  {errors.role}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="status">Account Status</label>
              <select
                id="status"
                name="status"
                className={`form-control ${errors.status ? "error" : ""}`}
                value={formData.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.status && (
                <span className="error-message">
                  <ShieldAlert size={14} />
                  {errors.status}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              {isEditMode ? "Save Changes" : "Register Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
