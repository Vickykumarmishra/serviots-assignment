import { GENDER_OPTIONS, ROLE_OPTIONS, SORT_OPTIONS } from '../../utils/constants';
import './UserFilters.css';

/**
 * Search + filter + sort toolbar for the user list page.
 */
export default function UserFilters({
  searchQuery,
  onSearchChange,
  filterGender,
  onGenderChange,
  filterRole,
  onRoleChange,
  sortBy,
  onSortChange,
  onAddUser,
  totalResults,
}) {
  const hasActiveFilters = filterGender || filterRole || sortBy;

  const clearAllFilters = () => {
    onGenderChange('');
    onRoleChange('');
    onSortChange('');
  };

  return (
    <div className="user-filters">
      <div className="user-filters__top">
        <div className="user-filters__search-wrapper">
          <svg className="user-filters__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="user-filters__search"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search users"
            id="user-search"
          />
          {searchQuery && (
            <button
              className="user-filters__search-clear"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <button className="btn btn--primary" onClick={onAddUser} id="add-user-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add User
        </button>
      </div>

      <div className="user-filters__row">
        <div className="user-filters__selects">
          <div className="user-filters__select-group">
            <label htmlFor="filter-gender" className="user-filters__label">Gender</label>
            <select
              id="filter-gender"
              className="user-filters__select"
              value={filterGender}
              onChange={(e) => onGenderChange(e.target.value)}
            >
              <option value="">All Genders</option>
              {GENDER_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="user-filters__select-group">
            <label htmlFor="filter-role" className="user-filters__label">Role</label>
            <select
              id="filter-role"
              className="user-filters__select"
              value={filterRole}
              onChange={(e) => onRoleChange(e.target.value)}
            >
              <option value="">All Roles</option>
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="user-filters__select-group">
            <label htmlFor="sort-by" className="user-filters__label">Sort By</label>
            <select
              id="sort-by"
              className="user-filters__select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="">Default</option>
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="user-filters__meta">
          {hasActiveFilters && (
            <button className="user-filters__clear-btn" onClick={clearAllFilters}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Clear Filters
            </button>
          )}
          <span className="user-filters__count">{totalResults} user{totalResults !== 1 ? 's' : ''} found</span>
        </div>
      </div>
    </div>
  );
}
