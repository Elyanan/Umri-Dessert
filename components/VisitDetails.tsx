import { business } from '../lib/content';
import { Pin } from './icons';

export function VisitDetails({ compact = false }: { compact?: boolean }) {
  return (
    <div className="visit-details">
      <address><strong>{business.name}</strong><br />{business.neighborhood}, {business.city}, {business.country}</address>
      <div className="visit-hours"><span>Listed hours</span><p>{business.hours.display}</p><small>Call to confirm before visiting.</small></div>
      <div className="visit-actions">
        <a className="filled-button" href={business.directions} target="_blank" rel="noopener noreferrer"><Pin /> Get directions</a>
        <a className={compact ? 'text-link' : 'outline-button'} href={business.phone.href}>{compact ? business.phone.display : `Call ${business.phone.display}`}</a>
      </div>
    </div>
  );
}
