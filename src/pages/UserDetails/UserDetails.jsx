import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserById } from '../../api/userService';
import { getInitials, formatAddress } from '../../utils/helpers';
import Skeleton from '../../components/Skeleton/Skeleton';
import './UserDetails.css';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUserById(id);
        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load user details.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadUser();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="user-details">
        <div className="user-details__container">
          <UserDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-details">
        <div className="user-details__container">
          <div className="user-details__error">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>Failed to load user</h3>
            <p>{error}</p>
            <Link to="/" className="btn btn--primary">
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="user-details">
      <div className="user-details__container">
        {/* Profile Header */}
        <section className="user-details__profile-card">
          <div className="user-details__avatar-wrapper">
            {user.image ? (
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="user-details__avatar-img"
              />
            ) : (
              <span className="user-details__avatar-fallback">
                {getInitials(user.firstName, user.lastName)}
              </span>
            )}
          </div>
          <div className="user-details__profile-info">
            <h2 className="user-details__name">
              {user.firstName} {user.lastName}
            </h2>
            <p className="user-details__email">{user.email}</p>
            <div className="user-details__badges">
              <span className={`user-details__badge user-details__badge--${user.role?.toLowerCase()}`}>
                {user.role}
              </span>
              <span className="user-details__badge user-details__badge--gender">
                {user.gender}
              </span>
            </div>
          </div>
        </section>

        <div className="user-details__grid">
          {/* Basic Information */}
          <section className="user-details__card">
            <h3 className="user-details__card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Basic Information
            </h3>
            <dl className="user-details__info-list">
              <div className="user-details__info-item">
                <dt>Full Name</dt>
                <dd>{user.firstName} {user.lastName}</dd>
              </div>
              <div className="user-details__info-item">
                <dt>Email</dt>
                <dd>{user.email}</dd>
              </div>
              <div className="user-details__info-item">
                <dt>Phone</dt>
                <dd>{user.phone || '—'}</dd>
              </div>
              <div className="user-details__info-item">
                <dt>Age</dt>
                <dd>{user.age || '—'}</dd>
              </div>
              <div className="user-details__info-item">
                <dt>Gender</dt>
                <dd className="user-details__capitalize">{user.gender || '—'}</dd>
              </div>
              <div className="user-details__info-item">
                <dt>Role</dt>
                <dd className="user-details__capitalize">{user.role || '—'}</dd>
              </div>
            </dl>
          </section>

          {/* Address Information */}
          <section className="user-details__card">
            <h3 className="user-details__card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Address Information
            </h3>
            <dl className="user-details__info-list">
              <div className="user-details__info-item">
                <dt>Address Line</dt>
                <dd>{user.address?.address || '—'}</dd>
              </div>
              <div className="user-details__info-item">
                <dt>City</dt>
                <dd>{user.address?.city || '—'}</dd>
              </div>
              <div className="user-details__info-item">
                <dt>State</dt>
                <dd>{user.address?.state || '—'}</dd>
              </div>
              <div className="user-details__info-item">
                <dt>Country</dt>
                <dd>{user.address?.country || '—'}</dd>
              </div>
              <div className="user-details__info-item user-details__info-item--full">
                <dt>Full Address</dt>
                <dd>{formatAddress(user.address)}</dd>
              </div>
            </dl>
          </section>

          {/* Company Information */}
          <section className="user-details__card">
            <h3 className="user-details__card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              Company Information
            </h3>
            <dl className="user-details__info-list">
              <div className="user-details__info-item">
                <dt>Company Name</dt>
                <dd>{user.company?.name || '—'}</dd>
              </div>
              <div className="user-details__info-item">
                <dt>Department</dt>
                <dd>{user.company?.department || '—'}</dd>
              </div>
              <div className="user-details__info-item">
                <dt>Title</dt>
                <dd>{user.company?.title || '—'}</dd>
              </div>
            </dl>
          </section>

          {/* Additional Information */}
          <section className="user-details__card">
            <h3 className="user-details__card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Additional Information
            </h3>
            <dl className="user-details__info-list">
              <div className="user-details__info-item">
                <dt>Birth Date</dt>
                <dd>
                  {user.birthDate
                    ? new Date(user.birthDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : '—'}
                </dd>
              </div>
              <div className="user-details__info-item">
                <dt>University</dt>
                <dd>{user.university || '—'}</dd>
              </div>
            </dl>
          </section>
        </div>

        <div className="user-details__footer">
          <Link to="/" className="btn btn--secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton placeholder for the user details page while loading.
 */
function UserDetailsSkeleton() {
  return (
    <div className="user-details__skeleton">
      <div className="user-details__profile-card">
        <Skeleton width="96px" height="96px" borderRadius="50%" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <Skeleton width="180px" height="24px" />
          <Skeleton width="220px" height="16px" />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Skeleton width="70px" height="24px" borderRadius="12px" />
            <Skeleton width="60px" height="24px" borderRadius="12px" />
          </div>
        </div>
      </div>
      <div className="user-details__grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="user-details__card">
            <Skeleton width="160px" height="18px" style={{ marginBottom: '1rem' }} />
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <Skeleton width="80px" height="14px" />
                <Skeleton width="140px" height="14px" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
