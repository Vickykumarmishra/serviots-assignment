import { Link } from 'react-router-dom';
import { getInitials } from '../../utils/helpers';
import { UserRowSkeleton } from '../Skeleton/Skeleton';
import './UserTable.css';

/**
 * Renders the user data in a responsive table layout.
 * Shows skeleton rows while loading, empty state when no results.
 */
export default function UserTable({ users, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Role</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <UserRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="user-table-empty">
        <div className="user-table-empty__icon">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="17" y1="11" x2="23" y2="11" />
          </svg>
        </div>
        <h3 className="user-table-empty__title">No users found</h3>
        <p className="user-table-empty__desc">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="user-table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Role</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="user-table__row">
              <td data-label="User">
                <div className="user-table__user-cell">
                  <div className="user-table__avatar">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="user-table__avatar-img"
                        loading="lazy"
                      />
                    ) : (
                      <span className="user-table__avatar-fallback">
                        {getInitials(user.firstName, user.lastName)}
                      </span>
                    )}
                  </div>
                  <div className="user-table__user-info">
                    <span className="user-table__name">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="user-table__email">{user.email}</span>
                  </div>
                </div>
              </td>
              <td data-label="Phone">
                <span className="user-table__phone">{user.phone || '—'}</span>
              </td>
              <td data-label="Company">
                <span className="user-table__company">
                  {user.company?.name || '—'}
                </span>
              </td>
              <td data-label="Role">
                <span className={`user-table__role-badge user-table__role-badge--${user.role?.toLowerCase()}`}>
                  {user.role || '—'}
                </span>
              </td>
              <td data-label="Age">
                <span className="user-table__age">{user.age || '—'}</span>
              </td>
              <td data-label="Actions">
                <div className="user-table__actions">
                  <Link
                    to={`/users/${user.id}`}
                    className="user-table__action-btn user-table__action-btn--view"
                    title="View details"
                    aria-label={`View ${user.firstName} ${user.lastName}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </Link>
                  <button
                    className="user-table__action-btn user-table__action-btn--edit"
                    onClick={() => onEdit(user)}
                    title="Edit user"
                    aria-label={`Edit ${user.firstName} ${user.lastName}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="user-table__action-btn user-table__action-btn--delete"
                    onClick={() => onDelete(user)}
                    title="Delete user"
                    aria-label={`Delete ${user.firstName} ${user.lastName}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
