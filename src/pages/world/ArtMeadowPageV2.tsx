// Art Meadow V2 - Modern Apple-Quality Design
// Full-featured drawing studio with shapes and enhanced tools

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Slider, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorld } from '../../contexts/WorldContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BrushIcon from '@mui/icons-material/Brush';
import CreateIcon from '@mui/icons-material/Create';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import ColorizeIcon from '@mui/icons-material/Colorize';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Expanded vibrant color palette (24 colors)
const ART_COLORS = [
  '#f44336', '#e91e63', '#9c27b0', '#673ab7',
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
  '#009688', '#4caf50', '#8bc34a', '#cddc39',
  '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
  '#795548', '#607d8b', '#000000', '#ffffff',
  '#ff6b9d', '#fa709a', '#43e97b', '#667eea'
];

type DrawingTool = 'brush' | 'pencil' | 'crayon' | 'eraser' | 'circle' | 'square' | 'triangle' | 'star' | 'heart';

interface ToolConfig {
  name: string;
  icon: React.ReactNode;
  sizeMultiplier: number;
  opacity: number;
  lineCap: CanvasLineCap;
  isShape?: boolean;
}

const TOOL_CONFIGS: Record<DrawingTool, ToolConfig> = {
  brush: { name: 'Brush', icon: <BrushIcon />, sizeMultiplier: 1, opacity: 1, lineCap: 'round' },
  pencil: { name: 'Pencil', icon: <CreateIcon />, sizeMultiplier: 0.5, opacity: 0.7, lineCap: 'round' },
  crayon: { name: 'Crayon', icon: <AutoFixHighIcon />, sizeMultiplier: 1.5, opacity: 0.85, lineCap: 'square' },
  eraser: { name: 'Eraser', icon: <ColorizeIcon />, sizeMultiplier: 2, opacity: 1, lineCap: 'round' },
  circle: { name: 'Circle', icon: <CircleOutlinedIcon />, sizeMultiplier: 1, opacity: 1, lineCap: 'round', isShape: true },
  square: { name: 'Square', icon: <CropSquareIcon />, sizeMultiplier: 1, opacity: 1, lineCap: 'round', isShape: true },
  triangle: { name: 'Triangle', icon: <ChangeHistoryIcon />, sizeMultiplier: 1, opacity: 1, lineCap: 'round', isShape: true },
  star: { name: 'Star', icon: <StarBorderIcon />, sizeMultiplier: 1, opacity: 1, lineCap: 'round', isShape: true },
  heart: { name: 'Heart', icon: <FavoriteIcon />, sizeMultiplier: 1, opacity: 1, lineCap: 'round', isShape: true }
};


// Main Art Meadow Page
const ArtMeadowPageV2: React.FC = () => {
  const navigate = useNavigate();
  const { navigateToZone, updateCollection, currentProfile } = useWorld();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(10);
  const [tool, setTool] = useState<DrawingTool>('brush');
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [usedColors, setUsedColors] = useState<Set<string>>(new Set());

  useEffect(() => {
    navigateToZone('art-meadow');
  }, [navigateToZone]);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initCanvas = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      ctx.scale(dpr, dpr);

      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Save initial state
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialState]);
      setHistoryIndex(0);
    };

    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, []);

  // Draw shape
  const drawShape = useCallback((x: number, y: number, shapeTool: DrawingTool) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const size = brushSize * 3;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    switch (shapeTool) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(x - size, y - size, size * 2, size * 2);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size, y + size);
        ctx.lineTo(x + size, y + size);
        ctx.closePath();
        ctx.fill();
        break;
      case 'star':
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          const outerX = x + Math.cos(angle) * size;
          const outerY = y + Math.sin(angle) * size;
          const innerAngle = angle + Math.PI / 5;
          const innerX = x + Math.cos(innerAngle) * (size / 2);
          const innerY = y + Math.sin(innerAngle) * (size / 2);
          if (i === 0) ctx.moveTo(outerX, outerY);
          else ctx.lineTo(outerX, outerY);
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
        break;
      case 'heart':
        ctx.beginPath();
        ctx.moveTo(x, y + size / 4);
        ctx.bezierCurveTo(x, y - size / 4, x - size, y - size / 4, x - size, y + size / 4);
        ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.2, x, y + size * 1.5);
        ctx.bezierCurveTo(x, y + size * 1.2, x + size, y + size, x + size, y + size / 4);
        ctx.bezierCurveTo(x + size, y - size / 4, x, y - size / 4, x, y + size / 4);
        ctx.fill();
        break;
    }
  }, [brushSize, color]);

  // Save to history
  const saveToHistory = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, imageData]);
    setHistoryIndex(newHistory.length);
  }, [history, historyIndex]);

  // Start drawing
  const startDrawing = useCallback((x: number, y: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setLastPosition({ x, y });
    setCursorPosition({ x, y });

    const config = TOOL_CONFIGS[tool];

    // Handle shape stamps
    if (config.isShape) {
      drawShape(x, y, tool);
      saveToHistory();
      setIsDrawing(false);
      return;
    }

    // Drawing tools
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = brushSize * config.sizeMultiplier;
    ctx.globalAlpha = config.opacity;
    ctx.lineCap = config.lineCap;
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 0.1, y + 0.1);
    ctx.stroke();
  }, [brushSize, color, tool, drawShape, saveToHistory]);

  // Draw
  const draw = useCallback((x: number, y: number) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const config = TOOL_CONFIGS[tool];
    if (config.isShape) return; // Shapes don't drag

    setCursorPosition({ x, y });

    ctx.lineTo(x, y);
    ctx.stroke();

    // Enhanced crayon texture
    if (tool === 'crayon') {
      for (let i = 0; i < 5; i++) {
        const offsetX = (Math.random() - 0.5) * brushSize * 0.8;
        const offsetY = (Math.random() - 0.5) * brushSize * 0.8;
        ctx.globalAlpha = Math.random() * 0.5 + 0.3;
        ctx.beginPath();
        ctx.moveTo(lastPosition.x + offsetX, lastPosition.y + offsetY);
        ctx.lineTo(x + offsetX, y + offsetY);
        ctx.stroke();
      }
      ctx.globalAlpha = TOOL_CONFIGS[tool].opacity;
    }

    setLastPosition({ x, y });
  }, [isDrawing, tool, brushSize, lastPosition]);

  // Stop drawing
  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveToHistory();

    // Track color usage
    if (tool !== 'eraser' && !usedColors.has(color)) {
      setUsedColors(prev => new Set([...Array.from(prev), color]));
      updateCollection('colors', color);
    }
  }, [isDrawing, tool, color, usedColors, updateCollection, saveToHistory]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    startDrawing(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const rect = e.currentTarget.getBoundingClientRect();
      draw(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDrawing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      draw(touch.clientX - rect.left, touch.clientY - rect.top);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    stopDrawing();
  };

  // Undo
  const undo = () => {
    if (historyIndex > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      ctx.putImageData(history[newIndex], 0, 0);
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      ctx.putImageData(history[newIndex], 0, 0);
    }
  };

  // Clear - FIXED to keep white background
  const clearCanvas = () => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = containerRef.current.getBoundingClientRect();

    // Clear and fill with white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    saveToHistory();
  };

  // Save
  const saveDrawing = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'my-art.png';
    link.href = canvasRef.current.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackToHome = () => {
    navigateToZone('home-tree');
    navigate('/world/home-tree');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Gradient mesh */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 50%, ${alpha('#4facfe', 0.3)} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${alpha('#43e97b', 0.3)} 0%, transparent 50%)
          `,
          opacity: 0.8,
          zIndex: 0
        }}
      />

      {/* Compact Header */}
      <Box sx={{ position: 'relative', zIndex: 1, p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToHome}
          size="small"
          sx={{
            color: 'white',
            background: alpha('#ffffff', 0.2),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#ffffff', 0.3)}`,
            fontWeight: 600,
            px: 2,
            py: 0.5,
            fontSize: '0.85rem',
            '&:hover': { background: alpha('#ffffff', 0.3) }
          }}
        >
          Back
        </Button>

        <Typography
          sx={{
            color: 'white',
            fontWeight: 700,
            fontSize: '1.2rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          🎨 Art Studio
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1.5,
            py: 0.5,
            background: alpha('#ffffff', 0.2),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#ffffff', 0.3)}`,
            borderRadius: 2,
            fontSize: '0.85rem'
          }}
        >
          <Typography sx={{ color: 'white', fontWeight: 600 }}>
            {currentProfile?.collection.colors?.length || 0}
          </Typography>
          <Typography>🌈</Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', gap: 1.5, p: 1.5, overflow: 'hidden' }}>
        {/* Compact Tool Palette */}
        <Box
          sx={{
            width: '180px',
            background: alpha('#ffffff', 0.15),
            backdropFilter: 'blur(20px) saturate(180%)',
            border: `2px solid ${alpha('#ffffff', 0.3)}`,
            borderRadius: 3,
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            boxShadow: `0 20px 40px ${alpha('#000', 0.2)}`
          }}
        >
          {/* Colors */}
          <Box>
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, mb: 0.5, display: 'block' }}>
              Colors
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0.5 }}>
              {ART_COLORS.map((c, idx) => (
                <motion.div
                  key={c}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Box
                    onClick={() => setColor(c)}
                    sx={{
                      width: '100%',
                      height: 30,
                      background: c,
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: color === c ? `2px solid ${alpha('#fff', 1)}` : `1px solid ${alpha('#fff', 0.3)}`,
                      boxShadow: color === c ? `0 8px 16px ${alpha(c, 0.5)}` : 'none',
                      transition: 'all 0.2s'
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* Size */}
          <Box>
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, mb: 0.5, display: 'block' }}>
              Size: {brushSize}px
            </Typography>
            <Slider
              value={brushSize}
              onChange={(_, val) => setBrushSize(val as number)}
              min={2}
              max={40}
              size="small"
              sx={{
                color: 'white',
                '& .MuiSlider-thumb': { width: 16, height: 16 }
              }}
            />
          </Box>

          {/* Tools */}
          <Box>
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, mb: 0.5, display: 'block' }}>
              Drawing Tools
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {(['brush', 'pencil', 'crayon', 'eraser'] as DrawingTool[]).map((t) => (
                <Button
                  key={t}
                  size="small"
                  startIcon={TOOL_CONFIGS[t].icon}
                  onClick={() => setTool(t)}
                  sx={{
                    background: tool === t ? alpha('#ffffff', 0.3) : alpha('#ffffff', 0.1),
                    color: 'white',
                    fontSize: '0.75rem',
                    justifyContent: 'flex-start',
                    py: 0.5,
                    minHeight: 'auto',
                    '&:hover': { background: alpha('#ffffff', 0.25) }
                  }}
                >
                  {TOOL_CONFIGS[t].name}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Shapes */}
          <Box>
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, mb: 0.5, display: 'block' }}>
              Shape Stamps
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0.5 }}>
              {(['circle', 'square', 'triangle', 'star', 'heart'] as DrawingTool[]).map((t) => (
                <Button
                  key={t}
                  size="small"
                  onClick={() => setTool(t)}
                  sx={{
                    minWidth: 'auto',
                    p: 0.5,
                    background: tool === t ? alpha('#ffffff', 0.3) : alpha('#ffffff', 0.1),
                    color: 'white',
                    '&:hover': { background: alpha('#ffffff', 0.25) }
                  }}
                >
                  {TOOL_CONFIGS[t].icon}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0.5, mt: 'auto' }}>
            <Button size="small" startIcon={<UndoIcon />} onClick={undo} disabled={historyIndex <= 0} sx={{ fontSize: '0.7rem', color: 'white', background: alpha('#fff', 0.15), '&:disabled': { opacity: 0.3 } }}>Undo</Button>
            <Button size="small" startIcon={<RedoIcon />} onClick={redo} disabled={historyIndex >= history.length - 1} sx={{ fontSize: '0.7rem', color: 'white', background: alpha('#fff', 0.15), '&:disabled': { opacity: 0.3 } }}>Redo</Button>
            <Button size="small" startIcon={<DeleteIcon />} onClick={clearCanvas} sx={{ fontSize: '0.7rem', color: 'white', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>Clear</Button>
            <Button size="small" startIcon={<SaveIcon />} onClick={saveDrawing} sx={{ fontSize: '0.7rem', color: 'white', background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>Save</Button>
          </Box>
        </Box>

        {/* Canvas */}
        <Box
          ref={containerRef}
          sx={{
            flex: 1,
            background: alpha('#ffffff', 0.15),
            backdropFilter: 'blur(20px) saturate(180%)',
            border: `2px solid ${alpha('#ffffff', 0.3)}`,
            borderRadius: 3,
            p: 1,
            boxShadow: `0 20px 40px ${alpha('#000', 0.2)}`,
            display: 'flex',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={stopDrawing}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              cursor: TOOL_CONFIGS[tool].isShape ? 'crosshair' : 'default',
              touchAction: 'none',
              background: '#ffffff',
              boxShadow: `inset 0 0 20px ${alpha('#000', 0.05)}`
            }}
          />

          {/* Drawing glow */}
          <AnimatePresence>
            {isDrawing && tool !== 'eraser' && !TOOL_CONFIGS[tool].isShape && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.2, 0.4] }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  left: cursorPosition.x,
                  top: cursorPosition.y,
                  width: brushSize * 3,
                  height: brushSize * 3,
                  background: `radial-gradient(circle, ${alpha(color, 0.4)}, transparent)`,
                  pointerEvents: 'none',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%'
                }}
              />
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default ArtMeadowPageV2;
