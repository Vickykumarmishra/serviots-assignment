const BASE_URL = 'https://dummyjson.com';

/**
 * Fetches a paginated list of users from the API.
 * @param {number} limit - Number of users per page.
 * @param {number} skip - Number of users to skip (for pagination).
 * @returns {Promise<{users: Array, total: number, skip: number, limit: number}>}
 */
export async function fetchUsers(limit = 10, skip = 0) {
  const response = await fetch(
    `${BASE_URL}/users?limit=${limit}&skip=${skip}&select=id,firstName,lastName,email,phone,age,gender,image,role,company`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Searches users by a query string (matches first name, last name, or email).
 * @param {string} query - The search term.
 * @param {number} limit - Number of results per page.
 * @param {number} skip - Offset for pagination.
 * @returns {Promise<{users: Array, total: number}>}
 */
export async function searchUsers(query, limit = 10, skip = 0) {
  const response = await fetch(
    `${BASE_URL}/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches a single user's full details by ID.
 * @param {number} id - The user ID.
 * @returns {Promise<Object>}
 */
export async function fetchUserById(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user #${id}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Creates a new user record.
 * Note: DummyJSON simulates this — the user won't actually persist.
 * @param {Object} userData - The user fields to create.
 * @returns {Promise<Object>}
 */
export async function createUser(userData) {
  const response = await fetch(`${BASE_URL}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create user: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Updates an existing user record by ID.
 * @param {number} id - The user ID.
 * @param {Object} userData - The fields to update.
 * @returns {Promise<Object>}
 */
export async function updateUser(id, userData) {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user #${id}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Deletes a user record by ID.
 * @param {number} id - The user ID.
 * @returns {Promise<Object>}
 */
export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user #${id}: ${response.statusText}`);
  }

  return response.json();
}
