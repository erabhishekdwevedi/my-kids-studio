import logger from './logger';

const log = logger.createLogger('Storage');

/**
 * Type-safe localStorage utility with error handling
 */

/**
 * Check if a string is valid JSON
 * @param str - The string to check
 * @returns Whether the string is valid JSON
 */
function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Attempt to fix a corrupted string value
 * @param key - The localStorage key
 * @param value - The corrupted value
 * @returns The fixed value or null if unfixable
 */
function attemptToFixValue(key: string, value: string): string | null {
  // If it's a simple string without quotes, add quotes
  if (/^[a-zA-Z0-9_-]+$/.test(value)) {
    const fixedValue = `"${value}"`;
    log.info(`Fixed corrupted value for key: ${key}`, { original: value, fixed: fixedValue });
    return fixedValue;
  }
  
  // If it looks like an object but is missing quotes around keys
  if (value.startsWith('{') && value.endsWith('}')) {
    try {
      // Try to fix common JSON errors like missing quotes around keys
      const fixedValue = value.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
      if (isValidJSON(fixedValue)) {
        log.info(`Fixed corrupted object for key: ${key}`, { original: value, fixed: fixedValue });
        return fixedValue;
      }
    } catch (e) {
      // Failed to fix
    }
  }
  
  // If it looks like an array but has issues
  if (value.startsWith('[') && value.endsWith(']')) {
    try {
      // Try to fix common array issues
      const fixedValue = value.replace(/'/g, '"');
      if (isValidJSON(fixedValue)) {
        log.info(`Fixed corrupted array for key: ${key}`, { original: value, fixed: fixedValue });
        return fixedValue;
      }
    } catch (e) {
      // Failed to fix
    }
  }
  
  return null;
}

/**
 * Safely get an item from localStorage with type checking
 * @param key - The key to retrieve
 * @param defaultValue - Default value to return if key doesn't exist
 * @returns The parsed value or defaultValue if not found
 */
export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    
    // Try to parse the item
    try {
      return JSON.parse(item) as T;
    } catch (parseError) {
      log.warn(`Failed to parse item from localStorage for key: ${key}`, parseError);
      
      // Attempt to fix corrupted data
      const fixedValue = attemptToFixValue(key, item);
      if (fixedValue !== null && isValidJSON(fixedValue)) {
        try {
          // If we fixed it, update localStorage with the corrected value
          localStorage.setItem(key, fixedValue);
          log.info(`Corrected localStorage value for key: ${key}`);
          return JSON.parse(fixedValue) as T;
        } catch (e) {
          log.error(`Error updating fixed value in localStorage for key: ${key}`, e as Error);
        }
      }
      
      // If we couldn't fix it, remove the corrupted data
      try {
        localStorage.removeItem(key);
        log.info(`Removed corrupted localStorage value for key: ${key}`);
      } catch (e) {
        log.error(`Error removing corrupted value from localStorage for key: ${key}`, e as Error);
      }
      
      return defaultValue;
    }
  } catch (error) {
    log.error(`Error accessing localStorage for key: ${key}`, error as Error);
    return defaultValue;
  }
}

/**
 * Safely set an item in localStorage with error handling
 * @param key - The key to set
 * @param value - The value to store
 * @returns True if successful, false otherwise
 */
export function setItem<T>(key: string, value: T): boolean {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    log.error(`Error setting localStorage for key: ${key}`, error as Error, { value });
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * @param key - The key to remove
 * @returns True if successful, false otherwise
 */
export function removeItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    log.error(`Error removing localStorage for key: ${key}`, error as Error);
    return false;
  }
}

/**
 * Clear all items from localStorage
 * @returns True if successful, false otherwise
 */
export function clear(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    log.error('Error clearing localStorage', error as Error);
    return false;
  }
}

/**
 * Check if localStorage is available
 * @returns True if localStorage is available, false otherwise
 */
export function isAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get all keys from localStorage
 * @returns Array of keys
 */
export function getAllKeys(): string[] {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    log.error('Error getting all keys from localStorage', error as Error);
    return [];
  }
}

/**
 * Validate data against a schema before storing
 * @param data - The data to validate
 * @param validator - A function that validates the data
 * @returns True if valid, false otherwise
 */
export function validateData<T>(data: T, validator: (data: T) => boolean): boolean {
  try {
    return validator(data);
  } catch (error) {
    log.error('Error validating data', error as Error, { data });
    return false;
  }
}

/**
 * Repair all corrupted localStorage items
 * This can be called on application startup to fix any corrupted data
 * @returns Number of items repaired
 */
export function repairCorruptedStorage(): number {
  try {
    let repairedCount = 0;
    const keys = getAllKeys();
    
    for (const key of keys) {
      try {
        const value = localStorage.getItem(key);
        if (value !== null && !isValidJSON(value)) {
          const fixedValue = attemptToFixValue(key, value);
          if (fixedValue !== null && isValidJSON(fixedValue)) {
            localStorage.setItem(key, fixedValue);
            repairedCount++;
            log.info(`Repaired corrupted localStorage item: ${key}`);
          } else {
            // If we can't fix it, remove it
            localStorage.removeItem(key);
            log.info(`Removed unfixable corrupted localStorage item: ${key}`);
          }
        }
      } catch (e) {
        log.error(`Error processing localStorage key: ${key}`, e as Error);
      }
    }
    
    return repairedCount;
  } catch (error) {
    log.error('Error repairing corrupted storage', error as Error);
    return 0;
  }
}

// Default export
const storage = {
  getItem,
  setItem,
  removeItem,
  clear,
  isAvailable,
  getAllKeys,
  validateData,
  repairCorruptedStorage
};

export default storage; 