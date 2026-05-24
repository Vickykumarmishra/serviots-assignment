import './Skeleton.css';

/**
 * A shimmer skeleton element for loading states.
 * @param {{ width?: string, height?: string, borderRadius?: string, style?: Object }} props
 */
export default function Skeleton({ width, height = '1rem', borderRadius = '6px', style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
      aria-hidden="true"
    />
  );
}

/**
 * Renders a full skeleton row mimicking a user table row.
 */
export function UserRowSkeleton() {
  return (
    <tr className="skeleton-row">
      <td>
        <div className="skeleton-row__user">
          <Skeleton width="40px" height="40px" borderRadius="50%" />
          <div className="skeleton-row__info">
            <Skeleton width="120px" height="14px" />
            <Skeleton width="160px" height="12px" />
          </div>
        </div>
      </td>
      <td><Skeleton width="140px" height="14px" /></td>
      <td><Skeleton width="100px" height="14px" /></td>
      <td><Skeleton width="80px" height="14px" /></td>
      <td><Skeleton width="60px" height="14px" /></td>
      <td>
        <div className="skeleton-row__actions">
          <Skeleton width="32px" height="32px" borderRadius="8px" />
          <Skeleton width="32px" height="32px" borderRadius="8px" />
          <Skeleton width="32px" height="32px" borderRadius="8px" />
        </div>
      </td>
    </tr>
  );
}
