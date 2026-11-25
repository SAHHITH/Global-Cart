export function getStorageItem(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Failed reading localStorage key "${key}":`, error);
    return fallback;
  }
}

export function setStorageItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed writing localStorage key "${key}":`, error);
    return false;
  }
}

export function removeStorageItem(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed removing localStorage key "${key}":`, error);
    return false;
  }
}