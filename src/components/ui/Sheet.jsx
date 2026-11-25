import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function Sheet({ open, onOpenChange, side = 'right', children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) {
        onOpenChange?.(false);
      }
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (typeof document === 'undefined') return null;

  const isLeft = side === 'left';

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange?.(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <motion.aside
            initial={{ x: isLeft ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isLeft ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={`relative z-10 flex h-full w-full max-w-md flex-col shadow-2xl ${
              isLeft ? 'mr-auto border-r' : 'ml-auto border-l'
            }`}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function SheetHeader({ className = '', onClose, children }) {
  return (
    <div
      className={`flex items-center justify-between border-b px-5 py-4 ${className}`}
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div>{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="rounded-lg p-1.5 transition hover:bg-black/5 dark:hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export function SheetTitle({ className = '', children }) {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}

export default Sheet;