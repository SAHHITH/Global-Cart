import { useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '@/utils/storage';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => getStorageItem(key, initialValue));

  useEffect(() => {
    setStorageItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;