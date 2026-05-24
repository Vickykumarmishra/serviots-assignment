/**
 * Returns the full name from a user object.
 * @param {Object} user
 * @returns {string}
 */
export function getFullName(user) {
  return `${user.firstName} ${user.lastName}`;
}

/**
 * Formats an address object into a single-line readable string.
 * @param {Object} address
 * @returns {string}
 */
export function formatAddress(address) {
  if (!address) return 'N/A';
  const parts = [address.address, address.city, address.state, address.country].filter(Boolean);
  return parts.join(', ');
}

/**
 * Debounce utility — delays invoking `fn` until after `delay` ms
 * have elapsed since the last invocation.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Classnames utility — joins truthy class strings.
 * Example: cx('btn', isActive && 'btn--active', size && `btn--${size}`)
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Validates an email address format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates a phone number — accepts digits, spaces, dashes, and optional leading +.
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  return /^[+]?[\d\s-]{7,15}$/.test(phone);
}

/**
 * Creates initials from a full name for avatar fallback.
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string}
 */
export function getInitials(firstName, lastName) {
  return `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}`;
}
