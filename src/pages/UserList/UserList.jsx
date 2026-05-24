import { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useToast } from '../../context/ToastContext';
import UserFilters from '../../components/UserFilters/UserFilters';
import UserTable from '../../components/UserTable/UserTable';
import UserForm from '../../components/UserForm/UserForm';
import Pagination from '../../components/Pagination/Pagination';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import './UserList.css';

export default function UserList() {
  const {
    users,
    allFilteredCount,
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
    refetch,
  } = useUsers();

  const { addToast } = useToast();

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openCreateForm = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editingUser) {
        await handleUpdateUser(editingUser.id, formData);
        addToast(`${formData.firstName} ${formData.lastName} has been updated successfully.`, 'success');
      } else {
        await handleCreateUser(formData);
        addToast(`${formData.firstName} ${formData.lastName} has been added successfully.`, 'success');
      }
      closeForm();
    } catch (err) {
      addToast(err.message || 'Operation failed. Please try again.', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const confirmDelete = (user) => {
    setDeleteTarget(user);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await handleDeleteUser(deleteTarget.id);
      addToast(`${deleteTarget.firstName} ${deleteTarget.lastName} has been deleted.`, 'success');
      setDeleteTarget(null);
    } catch (err) {
      addToast(err.message || 'Failed to delete user.', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="user-list-page">
      <div className="user-list-page__header">
        <div>
          <h2 className="user-list-page__title">Manage Users</h2>
          <p className="user-list-page__subtitle">
            View, search, and manage all user accounts in one place.
          </p>
        </div>
      </div>

      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterGender={filterGender}
        onGenderChange={setFilterGender}
        filterRole={filterRole}
        onRoleChange={setFilterRole}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onAddUser={openCreateForm}
        totalResults={allFilteredCount}
      />

      {error && (
        <div className="user-list-page__error" role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <strong>Something went wrong</strong>
            <p>{error}</p>
          </div>
          <button className="btn btn--secondary btn--sm" onClick={refetch}>
            Retry
          </button>
        </div>
      )}

      <UserTable
        users={users}
        loading={loading}
        onEdit={openEditForm}
        onDelete={confirmDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={allFilteredCount}
        onPageChange={setCurrentPage}
      />

      <UserForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        editingUser={editingUser}
        loading={formLoading}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.firstName} ${deleteTarget.lastName}? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        variant="danger"
        loading={deleteLoading}
      />
    </div>
  );
}
