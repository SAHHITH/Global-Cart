import { ChevronDown } from 'lucide-react';

export function Select({
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  className = '',
  id,
  name,
  ariaLabel,
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <select
        id={id}
        name={name}
        aria-label={ariaLabel || placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full appearance-none rounded-lg border px-3 py-2 pr-9 text-sm font-medium outline-none transition focus:border-[#2874F0] focus:ring-2 focus:ring-[#2874F0]/20"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)',
        }}
      >
        {options.map((opt) => {
          const optValue = typeof opt === 'object' ? opt.value : opt;
          const optLabel = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={optValue} value={optValue}>
              {optLabel}
            </option>
          );
        })}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
        aria-hidden="true"
      />
    </div>
  );
}

export default Select;