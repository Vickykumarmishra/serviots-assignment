/**
 * Form validation rules for the user create/edit modal.
 * Returns an object of field-level error messages (empty string = valid).
 * @param {Object} values
 * @returns {Object}
 */
export function validateUserForm(values) {
  const errors = {};

  if (!values.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!values.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!values.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[+]?[\d\s-]{7,15}$/.test(values.phone)) {
    errors.phone = 'Enter a valid phone number';
  }

  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age < 1 || values.age > 150) {
    errors.age = 'Enter a valid age (1-150)';
  }

  if (!values.gender) {
    errors.gender = 'Please select a gender';
  }

  if (!values.role?.trim()) {
    errors.role = 'Role is required';
  }

  if (!values.company?.name?.trim()) {
    errors['company.name'] = 'Company name is required';
  }

  if (!values.company?.department?.trim()) {
    errors['company.department'] = 'Department is required';
  }

  if (!values.company?.title?.trim()) {
    errors['company.title'] = 'Title is required';
  }

  return errors;
}

/**
 * Checks if there are any validation errors.
 * @param {Object} errors
 * @returns {boolean}
 */
export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
