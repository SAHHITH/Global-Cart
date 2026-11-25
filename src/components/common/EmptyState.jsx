import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  icon: Icon = PackageOpen,
  title = 'Nothing here yet',
  description = 'Try adjusting your filters or explore our catalog.',
  actionLabel,
  onAction,
}) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-14 text-center"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF9900]/15 text-[#FF9900]">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="mt-1.5 max-w-md text-sm" style={{ color: 'var(--text-muted)' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;