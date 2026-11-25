import { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

export function Tabs({ defaultValue, value, onValueChange, className = '', children }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalValue;

  const setActiveTab = (nextVal) => {
    if (value === undefined) setInternalValue(nextVal);
    onValueChange?.(nextVal);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = '', children }) {
  return (
    <div
      role="tablist"
      className={`inline-flex flex-wrap items-center gap-1 rounded-xl border p-1 ${className}`}
      style={{
        backgroundColor: 'var(--bg-muted)',
        borderColor: 'var(--border-color)',
      }}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className = '', children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
        isActive
          ? 'bg-[#101828] text-white shadow-xs dark:bg-[#FF9900] dark:text-[#101828]'
          : 'opacity-75 hover:opacity-100'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = '', children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return (
    <div role="tabpanel" className={`mt-4 ${className}`}>
      {children}
    </div>
  );
}

export default Tabs;