/**
 * Security Utilities for Kids Studio
 * XSS Protection, Input Sanitization, Content Security
 */

/**
 * Sanitize user input to prevent XSS attacks
 * For educational content that kids might input (names, text)
 */
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
    .slice(0, 500); // Max 500 characters for user inputs
};

/**
 * Sanitize HTML content - remove dangerous tags but keep safe formatting
 * For story/quiz content display
 */
export const sanitizeHTML = (html: string): string => {
  if (!html || typeof html !== 'string') return '';

  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');

  // Remove data: protocol (except for safe image data URIs)
  sanitized = sanitized.replace(/data:(?!image\/(png|jpg|jpeg|gif|svg\+xml))/gi, '');

  // Remove iframe, embed, object tags
  sanitized = sanitized.replace(/<(iframe|embed|object)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, '');

  return sanitized.trim();
};

/**
 * Validate profile name - alphanumeric + spaces only, kid-safe
 */
export const validateProfileName = (name: string): { valid: boolean; error?: string } => {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }

  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  if (trimmed.length > 20) {
    return { valid: false, error: 'Name must be less than 20 characters' };
  }

  // Allow letters, numbers, spaces, and basic emoji
  const validNamePattern = /^[a-zA-Z0-9\s\u{1F300}-\u{1F9FF}]+$/u;
  if (!validNamePattern.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters, numbers, and spaces' };
  }

  return { valid: true };
};

/**
 * Sanitize localStorage keys to prevent injection
 */
export const sanitizeStorageKey = (key: string): string => {
  if (!key || typeof key !== 'string') return '';

  return key
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(0, 100);
};

/**
 * Validate color hex code (for art studio)
 */
export const isValidHexColor = (color: string): boolean => {
  if (!color || typeof color !== 'string') return false;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

/**
 * Rate limiting for actions (prevent abuse)
 * Simple in-memory rate limiter
 */
class RateLimiter {
  private limits: Map<string, number[]> = new Map();

  /**
   * Check if action is allowed
   * @param key Unique identifier for the action (e.g., 'save-drawing', 'create-profile')
   * @param maxAttempts Maximum attempts allowed
   * @param windowMs Time window in milliseconds
   */
  isAllowed(key: string, maxAttempts: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const timestamps = this.limits.get(key) || [];

    // Remove old timestamps outside the window
    const recentTimestamps = timestamps.filter(ts => now - ts < windowMs);

    if (recentTimestamps.length >= maxAttempts) {
      return false;
    }

    recentTimestamps.push(now);
    this.limits.set(key, recentTimestamps);

    return true;
  }

  /**
   * Clear rate limit for a specific key
   */
  clear(key: string): void {
    this.limits.delete(key);
  }

  /**
   * Clear all rate limits (useful for logout)
   */
  clearAll(): void {
    this.limits.clear();
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Validate file upload (for future features like avatar upload)
 */
export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  // Max file size: 5MB
  const MAX_SIZE = 5 * 1024 * 1024;

  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File must be less than 5MB' };
  }

  // Allowed image types only
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only PNG, JPEG, and GIF images are allowed' };
  }

  // Check file extension matches MIME type (basic check)
  const extension = file.name.split('.').pop()?.toLowerCase();
  const typeMap: Record<string, string[]> = {
    'image/png': ['png'],
    'image/jpeg': ['jpg', 'jpeg'],
    'image/jpg': ['jpg', 'jpeg'],
    'image/gif': ['gif']
  };

  const expectedExtensions = typeMap[file.type];
  if (!expectedExtensions || !expectedExtensions.includes(extension || '')) {
    return { valid: false, error: 'File extension does not match file type' };
  }

  return { valid: true };
};

/**
 * Safely parse JSON with error handling
 */
export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.warn('Error parsing JSON:', error);
    return fallback;
  }
};

/**
 * Safely access localStorage with error handling
 */
export const safeLocalStorage = {
  getItem: (key: string, fallback: string = ''): string => {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : fallback;
    } catch (error) {
      console.warn(`Error reading from localStorage key "${key}":`, error);
      return fallback;
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }
};

/**
 * Generate a random ID for elements that need unique identifiers
 */
export const generateSecureId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Escape special regex characters in user input
 * For search functionality
 */
export const escapeRegex = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Validate URL for external links (if needed in future)
 */
export const isValidURL = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;

  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

/**
 * Sanitize object for JSON serialization (remove functions, symbols)
 * Prevents code injection via localStorage
 */
export const sanitizeForJSON = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeForJSON(item)) as unknown as T;
  }

  const sanitized: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const type = typeof value;

      // Only allow primitive types and plain objects/arrays
      if (type === 'string' || type === 'number' || type === 'boolean' || value === null) {
        sanitized[key] = value;
      } else if (type === 'object') {
        sanitized[key] = sanitizeForJSON(value);
      }
      // Skip functions, symbols, undefined
    }
  }

  return sanitized as T;
};

export default {
  sanitizeInput,
  sanitizeHTML,
  validateProfileName,
  sanitizeStorageKey,
  isValidHexColor,
  rateLimiter,
  validateFileUpload,
  safeJsonParse,
  safeLocalStorage,
  generateSecureId,
  escapeRegex,
  isValidURL,
  sanitizeForJSON
}; 