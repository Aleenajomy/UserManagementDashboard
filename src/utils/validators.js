/**
 * Validates the user form data.
 * @param {Object} formData The state of the form.
 * @returns {Object} An object containing error messages mapped to field names.
 */
export const validateForm = (formData) => {
  const errors = {};

  // First Name validation
  if (!formData.firstName || !formData.firstName.trim()) {
    errors.firstName = "First Name is required";
  } else if (!/^[A-Za-z\s-]{2,30}$/.test(formData.firstName.trim())) {
    errors.firstName = "First Name must be 2-30 alphabetic characters";
  }

  // Last Name validation
  if (!formData.lastName || !formData.lastName.trim()) {
    errors.lastName = "Last Name is required";
  } else if (!/^[A-Za-z\s-]{2,30}$/.test(formData.lastName.trim())) {
    errors.lastName = "Last Name must be 2-30 alphabetic characters";
  }

  // Email validation
  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Invalid email format (e.g. name@domain.com)";
  }

  // Department validation
  if (!formData.department || !formData.department.trim()) {
    errors.department = "Department is required";
  }

  // Role validation
  if (!formData.role) {
    errors.role = "Role selection is required";
  }

  // Status validation
  if (!formData.status) {
    errors.status = "Status selection is required";
  }

  return errors;
};
