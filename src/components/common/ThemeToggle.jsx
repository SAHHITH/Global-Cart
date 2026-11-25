import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';

export function ThemeToggle({ variant = 'header' }) {
  const { mode, resolvedTheme, setTheme } = useTheme();

  const options = [
    { value: 'light', label: 'Light Mode', icon: Sun },
    { value: 'dark', label: 'Dark Mode', icon: Moon },
    { value: 'system', label: 'System Default', icon: Monitor },
  ];

  const ActiveIcon = mode === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition cursor-pointer ${
          variant === 'header'
            ? 'bg-white/10 text-white hover:bg-white/20'
            : 'border border-(--border-color) bg-(--bg-secondary) text-(--text-primary) hover:opacity-90'
        }`}
      >
        <ActiveIcon className="h-4 w-4 text-[#FF9900]" />
        <span className="hidden xl:inline capitalize">{mode}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="right" className="w-44">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider opacity-60">
          Appearance
        </div>
        {options.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            active={mode === value}
            onClick={() => setTheme(value)}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="flex-1">{label}</span>
            {mode === value && <Check className="h-3.5 w-3.5 text-[#2874F0]" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;