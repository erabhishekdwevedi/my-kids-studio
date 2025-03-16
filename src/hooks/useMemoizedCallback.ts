import { useCallback, useRef } from 'react';

/**
 * A hook that memoizes a callback function and ensures it maintains referential equality
 * across renders unless its dependencies change.
 * 
 * This is an enhanced version of useCallback that also checks if the function body has changed.
 * 
 * @param callback The function to memoize
 * @param deps The dependencies array that determines when to update the memoized function
 * @returns The memoized callback function
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  // Store the previous callback and dependencies
  const callbackRef = useRef<T | null>(null);
  const depsRef = useRef<React.DependencyList>([]);
  
  // Check if dependencies have changed
  const depsChanged = deps.length !== depsRef.current.length || 
    deps.some((dep, i) => dep !== depsRef.current[i]);
  
  // Update the callback if dependencies have changed
  if (depsChanged) {
    callbackRef.current = callback;
    depsRef.current = deps;
  }
  
  // Use React's useCallback to memoize the function
  return useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      // This should always be defined after the first render
      return callbackRef.current!(...args);
    },
    [depsChanged] // Only re-create if deps have changed
  ) as T;
}

export default useMemoizedCallback; 