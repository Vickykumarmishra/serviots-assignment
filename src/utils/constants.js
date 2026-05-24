/**
 * Default empty state for the user form.
 * Used when creating a new user.
 */
export const EMPTY_USER_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: '',
  gender: '',
  role: '',
  image: '',
  address: {
    address: '',
    city: '',
    state: '',
    country: '',
  },
  company: {
    name: '',
    department: '',
    title: '',
  },
};

/**
 * Available gender options for filters and form dropdowns.
 */
export const GENDER_OPTIONS = ['male', 'female'];

/**
 * Available role options — derived from DummyJSON's common roles.
 */
export const ROLE_OPTIONS = ['admin', 'moderator', 'user'];

/**
 * Sort configuration options for the users list.
 */
export const SORT_OPTIONS = [
  { label: 'Name (A–Z)', value: 'name-asc' },
  { label: 'Name (Z–A)', value: 'name-desc' },
  { label: 'Age (Low–High)', value: 'age-asc' },
  { label: 'Age (High–Low)', value: 'age-desc' },
];

/**
 * Number of users displayed per page.
 */
export const PAGE_SIZE = 10;
