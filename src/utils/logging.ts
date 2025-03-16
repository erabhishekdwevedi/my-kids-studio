/**
 * Logging and error handling utilities for the Kids Studio application
 * These functions help with observability and debugging
 */

// Log levels
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

// Configuration for logging
interface LogConfig {
  enabled: boolean;
  level: LogLevel;
  includeTimestamp: boolean;
  prefix: string;
}

// Default configuration
const defaultConfig: LogConfig = {
  enabled: process.env.NODE_ENV === 'development',
  level: LogLevel.INFO,
  includeTimestamp: true,
  prefix: '[Kids Studio]'
};

// Current configuration
let config: LogConfig = { ...defaultConfig };

// Configure the logger
export const configureLogger = (newConfig: Partial<LogConfig>): void => {
  config = { ...config, ...newConfig };
};

// Format log message
const formatMessage = (level: LogLevel, message: string): string => {
  let formattedMessage = config.prefix ? `${config.prefix} ` : '';
  
  if (config.includeTimestamp) {
    formattedMessage += `[${new Date().toISOString()}] `;
  }
  
  formattedMessage += `[${level.toUpperCase()}] ${message}`;
  
  return formattedMessage;
};

// Check if log level should be displayed
const shouldLog = (level: LogLevel): boolean => {
  if (!config.enabled) return false;
  
  const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
  const configLevelIndex = levels.indexOf(config.level);
  const messageLevelIndex = levels.indexOf(level);
  
  return messageLevelIndex >= configLevelIndex;
};

// Logger functions
export const logger = {
  debug: (message: string, data?: any): void => {
    if (shouldLog(LogLevel.DEBUG)) {
      console.debug(formatMessage(LogLevel.DEBUG, message), data || '');
    }
  },
  
  info: (message: string, data?: any): void => {
    if (shouldLog(LogLevel.INFO)) {
      console.info(formatMessage(LogLevel.INFO, message), data || '');
    }
  },
  
  warn: (message: string, data?: any): void => {
    if (shouldLog(LogLevel.WARN)) {
      console.warn(formatMessage(LogLevel.WARN, message), data || '');
    }
  },
  
  error: (message: string, error?: Error, data?: any): void => {
    if (shouldLog(LogLevel.ERROR)) {
      console.error(formatMessage(LogLevel.ERROR, message), error || '', data || '');
      
      // In a real app, you might want to send this to an error tracking service
      // like Sentry, LogRocket, etc.
      if (process.env.NODE_ENV === 'production') {
        // Example: sendToErrorTrackingService(message, error, data);
      }
    }
  }
};

// Global error handler
export const setupGlobalErrorHandling = (): void => {
  if (typeof window !== 'undefined') {
    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      logger.error('Uncaught error', event.error, {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      logger.error('Unhandled promise rejection', 
        event.reason instanceof Error ? event.reason : new Error(String(event.reason))
      );
    });
  }
}; 