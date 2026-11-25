import { Loader2 } from 'lucide-react';

const VARIANT_CLASSES = {
  primary:
    'bg-[#FF9900] text-[#101828] font-bold hover:bg-[#E68A00] active:scale-[0.99] shadow-xs',
  secondary:
    'bg-[#2874F0] text-white font-semibold hover:bg-[#1C5ED6] active:scale-[0.99] shadow-xs',
  navy:
    'bg-[#101828] text-white font-semibold hover:bg-[#1D2939] dark:bg-[#1D2939] dark:hover:bg-[#293548]',
  outline:
    'border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 font-medium',
  ghost:
    'bg-transparent text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10 font-medium',
  danger:
    'bg-red-600 text-white font-semibold hover:bg-red-700',
};

const SIZE_CLASSES = {
  sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
  icon: 'h-10 w-10 rounded-xl justify-center p-0',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary
      } ${SIZE_CLASSES[size] || SIZE_CLASSES.md} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export default Button;