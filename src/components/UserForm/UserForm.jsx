import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import { EMPTY_USER_FORM, GENDER_OPTIONS, ROLE_OPTIONS } from '../../utils/constants';
import { validateUserForm, hasErrors } from '../../utils/validators';
import './UserForm.css';

/**
 * Create / Edit user modal form.
 * When `editingUser` is provided, the form pre-fills with existing data.
 */
export default function UserForm({ isOpen, onClose, onSubmit, editingUser, loading }) {
  const [formData, setFormData] = useState(EMPTY_USER_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isEditMode = Boolean(editingUser);

  // Pre-fill form when editing
  useEffect(() => {
    if (editingUser) {
      setFormData({
        firstName: editingUser.firstName || '',
        lastName: editingUser.lastName || '',
        email: editingUser.email || '',
        phone: editingUser.phone || '',
        age: editingUser.age || '',
        gender: editingUser.gender || '',
        role: editingUser.role || '',
        image: editingUser.image || '',
        address: {
          address: editingUser.address?.address || '',
          city: editingUser.address?.city || '',
          state: editingUser.address?.state || '',
          country: editingUser.address?.country || '',
        },
        company: {
          name: editingUser.company?.name || '',
          department: editingUser.company?.department || '',
          title: editingUser.company?.title || '',
        },
      });
    } else {
      setFormData(EMPTY_USER_FORM);
    }
    setErrors({});
    setTouched({});
  }, [editingUser, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields (address.city, company.name, etc.)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value,
      }));
    }

    // Clear error when user types
    if (touched[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateUserForm(formData);
    setErrors(validationErrors);

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(validationErrors).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched((prev) => ({ ...prev, ...allTouched }));

    if (hasErrors(validationErrors)) return;

    onSubmit(formData);
  };

  const getError = (field) => {
    return touched[field] ? errors[field] : undefined;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit User' : 'Add New User'}
      size="lg"
    >
      <form className="user-form" onSubmit={handleSubmit} noValidate>
        {/* Personal Information */}
        <fieldset className="user-form__section">
          <legend className="user-form__section-title">Personal Information</legend>
          <div className="user-form__grid">
            <div className="user-form__field">
              <label htmlFor="firstName" className="user-form__label">
                First Name <span className="user-form__required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`user-form__input ${getError('firstName') ? 'user-form__input--error' : ''}`}
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter first name"
              />
              {getError('firstName') && (
                <span className="user-form__error">{getError('firstName')}</span>
              )}
            </div>

            <div className="user-form__field">
              <label htmlFor="lastName" className="user-form__label">
                Last Name <span className="user-form__required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`user-form__input ${getError('lastName') ? 'user-form__input--error' : ''}`}
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter last name"
              />
              {getError('lastName') && (
                <span className="user-form__error">{getError('lastName')}</span>
              )}
            </div>

            <div className="user-form__field">
              <label htmlFor="email" className="user-form__label">
                Email <span className="user-form__required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`user-form__input ${getError('email') ? 'user-form__input--error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter email address"
              />
              {getError('email') && (
                <span className="user-form__error">{getError('email')}</span>
              )}
            </div>

            <div className="user-form__field">
              <label htmlFor="phone" className="user-form__label">
                Phone <span className="user-form__required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`user-form__input ${getError('phone') ? 'user-form__input--error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter phone number"
              />
              {getError('phone') && (
                <span className="user-form__error">{getError('phone')}</span>
              )}
            </div>

            <div className="user-form__field">
              <label htmlFor="age" className="user-form__label">
                Age <span className="user-form__required">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className={`user-form__input ${getError('age') ? 'user-form__input--error' : ''}`}
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter age"
                min="1"
                max="150"
              />
              {getError('age') && (
                <span className="user-form__error">{getError('age')}</span>
              )}
            </div>

            <div className="user-form__field">
              <label htmlFor="gender" className="user-form__label">
                Gender <span className="user-form__required">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                className={`user-form__input user-form__select ${getError('gender') ? 'user-form__input--error' : ''}`}
                value={formData.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </option>
                ))}
              </select>
              {getError('gender') && (
                <span className="user-form__error">{getError('gender')}</span>
              )}
            </div>

            <div className="user-form__field">
              <label htmlFor="role" className="user-form__label">
                Role <span className="user-form__required">*</span>
              </label>
              <select
                id="role"
                name="role"
                className={`user-form__input user-form__select ${getError('role') ? 'user-form__input--error' : ''}`}
                value={formData.role}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select role</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </option>
                ))}
              </select>
              {getError('role') && (
                <span className="user-form__error">{getError('role')}</span>
              )}
            </div>

            <div className="user-form__field">
              <label htmlFor="image" className="user-form__label">
                Profile Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                className="user-form__input"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>
        </fieldset>

        {/* Address Information */}
        <fieldset className="user-form__section">
          <legend className="user-form__section-title">Address Information</legend>
          <div className="user-form__grid">
            <div className="user-form__field user-form__field--full">
              <label htmlFor="address.address" className="user-form__label">
                Address Line
              </label>
              <input
                type="text"
                id="address.address"
                name="address.address"
                className="user-form__input"
                value={formData.address.address}
                onChange={handleChange}
                placeholder="Enter street address"
              />
            </div>

            <div className="user-form__field">
              <label htmlFor="address.city" className="user-form__label">City</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                className="user-form__input"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </div>

            <div className="user-form__field">
              <label htmlFor="address.state" className="user-form__label">State</label>
              <input
                type="text"
                id="address.state"
                name="address.state"
                className="user-form__input"
                value={formData.address.state}
                onChange={handleChange}
                placeholder="Enter state"
              />
            </div>

            <div className="user-form__field">
              <label htmlFor="address.country" className="user-form__label">Country</label>
              <input
                type="text"
                id="address.country"
                name="address.country"
                className="user-form__input"
                value={formData.address.country}
                onChange={handleChange}
                placeholder="Enter country"
              />
            </div>
          </div>
        </fieldset>

        {/* Company Information */}
        <fieldset className="user-form__section">
          <legend className="user-form__section-title">Company Information</legend>
          <div className="user-form__grid">
            <div className="user-form__field">
              <label htmlFor="company.name" className="user-form__label">
                Company Name <span className="user-form__required">*</span>
              </label>
              <input
                type="text"
                id="company.name"
                name="company.name"
                className={`user-form__input ${getError('company.name') ? 'user-form__input--error' : ''}`}
                value={formData.company.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter company name"
              />
              {getError('company.name') && (
                <span className="user-form__error">{getError('company.name')}</span>
              )}
            </div>

            <div className="user-form__field">
              <label htmlFor="company.department" className="user-form__label">
                Department <span className="user-form__required">*</span>
              </label>
              <input
                type="text"
                id="company.department"
                name="company.department"
                className={`user-form__input ${getError('company.department') ? 'user-form__input--error' : ''}`}
                value={formData.company.department}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter department"
              />
              {getError('company.department') && (
                <span className="user-form__error">{getError('company.department')}</span>
              )}
            </div>

            <div className="user-form__field">
              <label htmlFor="company.title" className="user-form__label">
                Title <span className="user-form__required">*</span>
              </label>
              <input
                type="text"
                id="company.title"
                name="company.title"
                className={`user-form__input ${getError('company.title') ? 'user-form__input--error' : ''}`}
                value={formData.company.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter job title"
              />
              {getError('company.title') && (
                <span className="user-form__error">{getError('company.title')}</span>
              )}
            </div>
          </div>
        </fieldset>

        <div className="user-form__footer">
          <button type="button" className="btn btn--secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? (
              <>
                <span className="btn__spinner" />
                {isEditMode ? 'Saving...' : 'Creating...'}
              </>
            ) : (
              isEditMode ? 'Save Changes' : 'Create User'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
