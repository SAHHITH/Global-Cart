export function LoadingSpinner({ fullScreen = false, label = 'Loading Global Cart...' }) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FF9900]/25 border-t-[#FF9900]" />
      {label && (
        <p className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-muted)' }}>
          {label}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default LoadingSpinner;