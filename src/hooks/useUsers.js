import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchUsers, searchUsers, createUser, updateUser, deleteUser } from '../api/userService';
import { useDebounce } from './useDebounce';
import { PAGE_SIZE } from '../utils/constants';

/**
 * Central hook for user list state management.
 * Handles fetching, searching, filtering, sorting, pagination,
 * and CRUD operations against the DummyJSON API.
 */
export function useUsers() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 400);

  /**
   * Loads users from API — either a search or a standard paginated fetch.
   */
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const skip = (currentPage - 1) * PAGE_SIZE;
      let data;

      if (debouncedSearch.trim()) {
        data = await searchUsers(debouncedSearch.trim(), 100, 0);
      } else {
        data = await fetchUsers(100, 0);
      }

      setUsers(data.users || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message || 'Something went wrong while loading users.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, currentPage]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, filterGender, filterRole, sortBy]);

  /**
   * Applies client-side filtering by gender and role,
   * then sorts the result set.
   */
  const processedUsers = useMemo(() => {
    let result = [...users];

    // Filter by gender
    if (filterGender) {
      result = result.filter(
        (u) => u.gender?.toLowerCase() === filterGender.toLowerCase()
      );
    }

    // Filter by role
    if (filterRole) {
      result = result.filter(
        (u) => u.role?.toLowerCase() === filterRole.toLowerCase()
      );
    }

    // Sort
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          case 'name-desc':
            return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
          case 'age-asc':
            return (a.age || 0) - (b.age || 0);
          case 'age-desc':
            return (b.age || 0) - (a.age || 0);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [users, filterGender, filterRole, sortBy]);

  // Paginate the processed results
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return processedUsers.slice(start, start + PAGE_SIZE);
  }, [processedUsers, currentPage]);

  const totalPages = Math.ceil(processedUsers.length / PAGE_SIZE);

  /**
   * Adds a new user (API call + optimistic local update).
   */
  const handleCreateUser = useCallback(async (userData) => {
    const created = await createUser(userData);
    // API returns simulated data — merge with local state
    setUsers((prev) => [{ ...created, ...userData, id: created.id || Date.now() }, ...prev]);
    setTotal((prev) => prev + 1);
    return created;
  }, []);

  /**
   * Updates an existing user by ID.
   */
  const handleUpdateUser = useCallback(async (id, userData) => {
    const updated = await updateUser(id, userData);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...userData, ...updated } : u))
    );
    return updated;
  }, []);

  /**
   * Deletes a user by ID.
   */
  const handleDeleteUser = useCallback(async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setTotal((prev) => Math.max(0, prev - 1));
  }, []);

  return {
    users: paginatedUsers,
    allFilteredCount: processedUsers.length,
    total,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filterGender,
    setFilterGender,
    filterRole,
    setFilterRole,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    refetch: loadUsers,
  };
}
