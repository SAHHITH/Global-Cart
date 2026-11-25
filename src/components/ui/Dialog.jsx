import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function Dialog({ open, onOpenChange, children }) {
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

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange?.(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          {children}
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function DialogContent({ className = '', onClose, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 12 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl ${className}`}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-primary)',
      }}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-lg p-1.5 opacity-70 transition hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      {children}
    </motion.div>
  );
}

export function DialogHeader({ className = '', children }) {
  return <div className={`mb-4 flex flex-col space-y-1.5 ${className}`}>{children}</div>;
}

export function DialogTitle({ className = '', children }) {
  return <h3 className={`text-lg font-bold leading-none tracking-tight ${className}`}>{children}</h3>;
}

export default Dialog;