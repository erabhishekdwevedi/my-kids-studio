/**
 * Logger utility for consistent logging across the application
 * In production, this could be connected to a monitoring service like Sentry
 */

// Log levels
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

// Configuration for the logger
interface LoggerConfig {
  minLevel: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
}

// Default configuration
const defaultConfig: LoggerConfig = {
  minLevel: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: true,
  enableRemote: process.env.NODE_ENV === 'production'
};

// Current configuration
let config: LoggerConfig = { ...defaultConfig };

/**
 * Configure the logger
 * @param newConfig - New configuration to apply
 */
export const configureLogger = (newConfig: Partial<LoggerConfig>): void => {
  config = { ...config, ...newConfig };
};

/**
 * Check if a log level should be logged based on the current configuration
 * @param level - The log level to check
 * @returns Whether the level should be logged
 */
const shouldLog = (level: LogLevel): boolean => {
  const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
  const minLevelIndex = levels.indexOf(config.minLevel);
  const currentLevelIndex = levels.indexOf(level);
  
  return currentLevelIndex >= minLevelIndex;
};

/**
 * Format a log message with metadata
 * @param level - Log level
 * @param message - Log message
 * @param data - Additional data to log
 * @returns Formatted log object
 */
const formatLog = (level: LogLevel, message: string, data?: any): any => {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    environment: process.env.NODE_ENV,
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
  };
};

/**
 * Send a log to remote logging service (placeholder)
 * @param level - Log level
 * @param message - Log message
 * @param data - Additional data
 */
const sendRemoteLog = (level: LogLevel, message: string, data?: any): void => {
  if (!config.enableRemote) return;
  
  // This would be replaced with actual remote logging service
  // For example, Sentry, LogRocket, etc.
  const logData = formatLog(level, message, data);
  
  // Placeholder for remote logging
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureMessage(message, { level, extra: data });
    console.log('REMOTE LOG:', logData);
  }
};

/**
 * Log a message to the console
 * @param level - Log level
 * @param message - Log message
 * @param data - Additional data
 */
const consoleLog = (level: LogLevel, message: string, data?: any): void => {
  if (!config.enableConsole) return;
  
  const logData = formatLog(level, message, data);
  
  switch (level) {
    case LogLevel.DEBUG:
      console.debug(message, logData);
      break;
    case LogLevel.INFO:
      console.info(message, logData);
      break;
    case LogLevel.WARN:
      console.warn(message, logData);
      break;
    case LogLevel.ERROR:
      console.error(message, logData);
      break;
  }
};

/**
 * Log a debug message
 * @param message - Log message
 * @param data - Additional data
 */
export const debug = (message: string, data?: any): void => {
  if (!shouldLog(LogLevel.DEBUG)) return;
  consoleLog(LogLevel.DEBUG, message, data);
  sendRemoteLog(LogLevel.DEBUG, message, data);
};

/**
 * Log an info message
 * @param message - Log message
 * @param data - Additional data
 */
export const info = (message: string, data?: any): void => {
  if (!shouldLog(LogLevel.INFO)) return;
  consoleLog(LogLevel.INFO, message, data);
  sendRemoteLog(LogLevel.INFO, message, data);
};

/**
 * Log a warning message
 * @param message - Log message
 * @param data - Additional data
 */
export const warn = (message: string, data?: any): void => {
  if (!shouldLog(LogLevel.WARN)) return;
  consoleLog(LogLevel.WARN, message, data);
  sendRemoteLog(LogLevel.WARN, message, data);
};

/**
 * Log an error message
 * @param message - Log message
 * @param error - Error object
 * @param data - Additional data
 */
export const logError = (message: string, error?: Error, data?: any): void => {
  if (!shouldLog(LogLevel.ERROR)) return;
  consoleLog(LogLevel.ERROR, message, { error: error?.message || error, stack: error?.stack, ...data });
  sendRemoteLog(LogLevel.ERROR, message, { error: error?.message || error, stack: error?.stack, ...data });
};

/**
 * Create a logger instance with a specific context
 * @param context - Context name for the logger
 * @returns Logger instance with context
 */
export const createLogger = (context: string) => {
  return {
    debug: (message: string, data?: any) => debug(`[${context}] ${message}`, data),
    info: (message: string, data?: any) => info(`[${context}] ${message}`, data),
    warn: (message: string, data?: any) => warn(`[${context}] ${message}`, data),
    error: (message: string, error?: Error, data?: any) => logError(`[${context}] ${message}`, error, data)
  };
};

// Default export
const logger = {
  debug,
  info,
  warn,
  error: logError,
  createLogger,
  configureLogger
};

export default logger; 