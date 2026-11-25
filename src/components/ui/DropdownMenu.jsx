import { useState, useRef, useEffect, createContext, useContext } from 'react';

const DropdownContext = createContext(null);

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ children, className = '', asChild = false }) {
  const { open, setOpen } = useContext(DropdownContext);

  if (asChild) {
    return (
      <span onClick={() => setOpen(!open)} className="inline-flex cursor-pointer">
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      className={className}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({ align = 'right', className = '', children }) {
  const { open } = useContext(DropdownContext);
  if (!open) return null;

  return (
    <div
      className={`absolute z-50 mt-2 min-w-44 rounded-xl border p-1.5 shadow-xl ${
        align === 'left' ? 'left-0' : 'right-0'
      } ${className}`}
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-primary)',
      }}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ onClick, active = false, className = '', children }) {
  const { setOpen } = useContext(DropdownContext);

  const handleClick = (e) => {
    onClick?.(e);
    setOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
        active
          ? 'bg-[#2874F0]/15 text-[#2874F0] font-semibold'
          : 'hover:bg-black/5 dark:hover:bg-white/10'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default DropdownMenu;