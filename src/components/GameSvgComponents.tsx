import React from 'react';

/**
 * Collection of reusable SVG components for games
 * These components were previously duplicated across game files
 */

interface VehicleProps {
  color: string;
  size?: number;
  rotation?: number;
}

/**
 * Car SVG component - Sedan style
 */
export const CarSVG: React.FC<VehicleProps> = ({ color, size = 40, rotation = 0 }) => (
  <svg 
    width={size * 0.6} 
    height={size} 
    viewBox="0 0 60 100" 
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Car body - sedan style */}
    <rect x="10" y="55" width="40" height="35" rx="5" fill={color} /> {/* Main body */}
    <rect x="12" y="30" width="36" height="25" rx="8" fill={color} /> {/* Hood */}
    <rect x="15" y="15" width="30" height="20" rx="6" fill={color} /> {/* Roof */}
    
    {/* Windows */}
    <rect x="17" y="20" width="26" height="12" rx="2" fill="#111" /> {/* Rear window */}
    <rect x="16" y="35" width="28" height="15" rx="2" fill="#111" /> {/* Front window */}
    <rect x="13" y="37" width="5" height="10" rx="1" fill="#111" /> {/* Left window */}
    <rect x="42" y="37" width="5" height="10" rx="1" fill="#111" /> {/* Right window */}
    
    {/* Lights - front */}
    <rect x="12" y="85" width="10" height="5" rx="2" fill="#ffeb3b" />
    <rect x="38" y="85" width="10" height="5" rx="2" fill="#ffeb3b" />
    
    {/* Lights - back */}
    <rect x="12" y="15" width="10" height="5" rx="2" fill="#f44336" />
    <rect x="38" y="15" width="10" height="5" rx="2" fill="#f44336" />
    
    {/* Wheels */}
    <circle cx="15" cy="70" r="6" fill="#111" />
    <circle cx="15" cy="70" r="3" fill="#555" />
    <circle cx="45" cy="70" r="6" fill="#111" />
    <circle cx="45" cy="70" r="3" fill="#555" />
    <circle cx="15" cy="30" r="6" fill="#111" />
    <circle cx="15" cy="30" r="3" fill="#555" />
    <circle cx="45" cy="30" r="6" fill="#111" />
    <circle cx="45" cy="30" r="3" fill="#555" />
    
    {/* Details */}
    <rect x="20" y="60" width="20" height="2" fill="#ddd" /> {/* Grill */}
    <rect x="25" y="50" width="10" height="1" fill="#ddd" /> {/* Hood detail */}
  </svg>
);

/**
 * Truck SVG component
 */
export const TruckSVG: React.FC<VehicleProps> = ({ color, size = 50, rotation = 0 }) => (
  <svg 
    width={size * 0.6} 
    height={size} 
    viewBox="0 0 70 120" 
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    {/* Truck cab */}
    <rect x="15" y="70" width="40" height="40" rx="5" fill={color} />
    
    {/* Truck cargo */}
    <rect x="10" y="20" width="50" height="50" rx="2" fill="#ddd" />
    <rect x="10" y="65" width="50" height="5" fill="#bbb" />
    
    {/* Windows */}
    <rect x="20" y="75" width="30" height="15" rx="2" fill="#111" />
    
    {/* Lights - front */}
    <rect x="15" y="105" width="10" height="5" rx="1" fill="#ffeb3b" />
    <rect x="45" y="105" width="10" height="5" rx="1" fill="#ffeb3b" />
    
    {/* Lights - back */}
    <rect x="15" y="20" width="10" height="5" rx="1" fill="#f44336" />
    <rect x="45" y="20" width="10" height="5" rx="1" fill="#f44336" />
    
    {/* Wheels */}
    <circle cx="15" cy="35" r="5" fill="#111" />
    <circle cx="55" cy="35" r="5" fill="#111" />
    <circle cx="15" cy="95" r="5" fill="#111" />
    <circle cx="55" cy="95" r="5" fill="#111" />
  </svg>
);

/**
 * Traffic cone SVG component
 */
export const TrafficConeSVG: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 50 50"
  >
    <polygon points="25,5 35,45 15,45" fill="#ff9800" />
    <rect x="12" y="45" width="26" height="5" fill="#555" />
    <rect x="18" y="15" width="14" height="3" fill="white" />
    <rect x="18" y="25" width="14" height="3" fill="white" />
    <rect x="18" y="35" width="14" height="3" fill="white" />
  </svg>
);

interface SceneryProps {
  size?: number;
  xOffset?: number;
}

/**
 * Tree SVG component
 */
export const TreeSVG: React.FC<SceneryProps> = ({ size = 40, xOffset = 0 }) => (
  <svg 
    width={size} 
    height={size * 1.2} 
    viewBox="0 0 100 120"
    style={{ transform: `translateX(${xOffset}px)` }}
  >
    {/* Tree trunk */}
    <rect x="45" y="70" width="10" height="40" fill="#8B4513" />
    
    {/* Tree foliage */}
    <polygon points="50,10 20,70 80,70" fill="#2E7D32" />
    <polygon points="50,30 25,80 75,80" fill="#388E3C" />
  </svg>
);

/**
 * Bush SVG component
 */
export const BushSVG: React.FC<SceneryProps> = ({ size = 30, xOffset = 0 }) => (
  <svg 
    width={size} 
    height={size * 0.6} 
    viewBox="0 0 100 60"
    style={{ transform: `translateX(${xOffset}px)` }}
  >
    <ellipse cx="50" cy="40" rx="40" ry="20" fill="#388E3C" />
    <ellipse cx="30" cy="30" rx="25" ry="15" fill="#2E7D32" />
    <ellipse cx="70" cy="30" rx="25" ry="15" fill="#2E7D32" />
    <ellipse cx="50" cy="20" rx="30" ry="20" fill="#388E3C" />
  </svg>
);

/**
 * Flower SVG component
 */
export const FlowerSVG: React.FC<SceneryProps> = ({ size = 15, xOffset = 0 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 50 50"
    style={{ transform: `translateX(${xOffset}px)` }}
  >
    <circle cx="25" cy="25" r="8" fill="#FFEB3B" />
    <circle cx="15" cy="15" r="7" fill="#E91E63" />
    <circle cx="35" cy="15" r="7" fill="#E91E63" />
    <circle cx="15" cy="35" r="7" fill="#E91E63" />
    <circle cx="35" cy="35" r="7" fill="#E91E63" />
  </svg>
);

/**
 * Blast SVG component for crash animation
 */
export const BlastSVG: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100"
  >
    {/* Outer explosion */}
    <circle cx="50" cy="50" r="45" fill="#ff5722" />
    <circle cx="50" cy="50" r="35" fill="#ff9800" />
    <circle cx="50" cy="50" r="25" fill="#ffeb3b" />
    <circle cx="50" cy="50" r="15" fill="#fff" />
    
    {/* Explosion rays */}
    <polygon points="50,5 60,25 40,25" fill="#ff5722" />
    <polygon points="50,95 60,75 40,75" fill="#ff5722" />
    <polygon points="5,50 25,60 25,40" fill="#ff5722" />
    <polygon points="95,50 75,60 75,40" fill="#ff5722" />
    <polygon points="15,15 30,30 5,5" fill="#ff5722" />
    <polygon points="85,85 70,70 95,95" fill="#ff5722" />
    <polygon points="15,85 30,70 5,95" fill="#ff5722" />
    <polygon points="85,15 70,30 95,5" fill="#ff5722" />
    
    {/* Debris particles */}
    <circle cx="65" cy="35" r="3" fill="#555" />
    <circle cx="30" cy="60" r="2" fill="#555" />
    <circle cx="70" cy="65" r="4" fill="#555" />
    <circle cx="40" cy="30" r="3" fill="#555" />
    <circle cx="60" cy="75" r="2" fill="#555" />
    <circle cx="25" cy="45" r="3" fill="#555" />
  </svg>
);

/**
 * Apple SVG component for Snake game
 */
export const AppleSVG: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 50 50"
  >
    <circle cx="25" cy="30" r="15" fill="#f44336" />
    <rect x="23" y="10" width="4" height="10" fill="#795548" />
    <path d="M 25 10 Q 35 5 30 15" fill="none" stroke="#4CAF50" strokeWidth="2" />
  </svg>
);

/**
 * Snake head SVG component
 */
export const SnakeHeadSVG: React.FC<{ size?: number; direction?: string; color?: string }> = ({ 
  size = 20, 
  direction = 'right',
  color = '#4CAF50'
}) => {
  // Calculate rotation based on direction
  let rotation = 0;
  switch (direction) {
    case 'up': rotation = -90; break;
    case 'down': rotation = 90; break;
    case 'left': rotation = 180; break;
    case 'right': rotation = 0; break;
  }
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 50 50"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <circle cx="25" cy="25" r="20" fill={color} />
      <circle cx="18" cy="18" r="4" fill="white" />
      <circle cx="18" cy="18" r="2" fill="black" />
      <circle cx="32" cy="18" r="4" fill="white" />
      <circle cx="32" cy="18" r="2" fill="black" />
      <path d="M 15 30 Q 25 40 35 30" fill="none" stroke="white" strokeWidth="2" />
    </svg>
  );
};

export default {
  CarSVG,
  TruckSVG,
  TrafficConeSVG,
  TreeSVG,
  BushSVG,
  FlowerSVG,
  BlastSVG,
  AppleSVG,
  SnakeHeadSVG
}; 