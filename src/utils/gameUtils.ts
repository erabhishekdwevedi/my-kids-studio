import { useCallback, useEffect, useRef, useState } from 'react';
import logger from './logger';

const log = logger.createLogger('GameUtils');

/**
 * Common utility functions for games
 */

/**
 * Collision detection between two rectangles
 * @param rect1 - First rectangle {x, y, width, height}
 * @param rect2 - Second rectangle {x, y, width, height}
 * @returns Whether the rectangles collide
 */
export function detectCollision(
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
): boolean {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

/**
 * Generate a random number between min and max
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number between min and max
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generate a random integer between min and max (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random integer between min and max
 */
export function randomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random color
 * @param excludeColors - Colors to exclude
 * @returns Random color in hex format
 */
export function randomColor(excludeColors: string[] = []): string {
  const colors = [
    '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', 
    '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', 
    '#cddc39', '#ffc107', '#ff9800', '#ff5722', '#795548'
  ].filter(color => !excludeColors.includes(color));
  
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Hook for creating a game loop with consistent timing
 * @param callback - Function to call on each frame
 * @param fps - Frames per second (default: 60)
 * @param active - Whether the game loop is active
 */
export function useGameLoop(
  callback: (deltaTime: number) => void,
  fps: number = 60,
  active: boolean = true
): void {
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef<(deltaTime: number) => void>(callback);
  
  // Update the callback ref when the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  const animate = useCallback((time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - previousTimeRef.current;
    const interval = 1000 / fps;
    
    // Only call the callback if enough time has passed
    if (deltaTime >= interval) {
      callbackRef.current(deltaTime);
      previousTimeRef.current = time;
    }
    
    requestRef.current = requestAnimationFrame(animate);
  }, [fps]);
  
  useEffect(() => {
    if (active) {
      requestRef.current = requestAnimationFrame(animate);
      log.debug('Game loop started', {});
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        log.debug('Game loop stopped', {});
      }
    };
  }, [animate, active]);
}

/**
 * Hook for handling keyboard controls in games
 * @param keyMap - Map of keys to actions
 * @param active - Whether the controls are active
 * @returns Object with pressed keys
 */
export function useGameControls<T extends string>(
  keyMap: Record<string, T>,
  active: boolean = true
): Record<T, boolean> {
  const [pressedKeys, setPressedKeys] = useState<Record<T, boolean>>(() => {
    const initial: Partial<Record<T, boolean>> = {};
    Object.values(keyMap).forEach(action => {
      initial[action] = false;
    });
    return initial as Record<T, boolean>;
  });
  
  useEffect(() => {
    if (!active) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = keyMap[e.key];
      if (action) {
        setPressedKeys(prev => ({ ...prev, [action]: true }));
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const action = keyMap[e.key];
      if (action) {
        setPressedKeys(prev => ({ ...prev, [action]: false }));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyMap, active]);
  
  return pressedKeys;
}

export default {
  detectCollision,
  randomBetween,
  randomIntBetween,
  randomColor,
  useGameLoop,
  useGameControls
}; 