import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Slider, 
  Button, 
  IconButton,
  Grid,
  Fab,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import PaletteIcon from '@mui/icons-material/Palette';
import BrushIcon from '@mui/icons-material/Brush';
import CreateIcon from '@mui/icons-material/Create';
import ColorizeIcon from '@mui/icons-material/Colorize';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import GestureIcon from '@mui/icons-material/Gesture';
import PageNavigation from '../components/PageNavigation';
import { useApp } from '../contexts/AppContext';

const colors = [
  '#f44336', // Red
  '#e91e63', // Pink
  '#9c27b0', // Purple
  '#673ab7', // Deep Purple
  '#3f51b5', // Indigo
  '#2196f3', // Blue
  '#03a9f4', // Light Blue
  '#00bcd4', // Cyan
  '#009688', // Teal
  '#4caf50', // Green
  '#8bc34a', // Light Green
  '#cddc39', // Lime
  '#ffeb3b', // Yellow
  '#ffc107', // Amber
  '#ff9800', // Orange
  '#ff5722', // Deep Orange
  '#795548', // Brown
  '#607d8b', // Blue Grey
  '#000000', // Black
  '#ffffff', // White
];

// Tool option interface
interface ToolOption {
  name: string;
  icon: React.ReactNode;
  lineWidth: (size: number) => number;
  apply: (ctx: CanvasRenderingContext2D, x?: number, y?: number, prevX?: number, prevY?: number) => void;
  cursor: string; // Custom cursor for each tool
}

type DrawingTool = 'brush' | 'pencil' | 'crayon' | 'eraser';

const DrawingBoardPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedProfile, selectedTheme } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [selectedTool, setSelectedTool] = useState<DrawingTool>('brush');
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  // Tool options
  const toolOptions = useMemo<Record<DrawingTool, ToolOption>>(() => ({
    brush: {
      name: 'Brush',
      icon: <BrushIcon />,
      lineWidth: (size) => size,
      apply: (ctx) => {
        ctx.globalAlpha = 1;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'6\' fill=\'%23000000\' fill-opacity=\'0.4\'/%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'2\' fill=\'%23000000\'/%3E%3C/svg%3E") 12 12, auto'
    },
    pencil: {
      name: 'Pencil',
      icon: <CreateIcon />,
      lineWidth: (size) => size * 0.7,
      apply: (ctx) => {
        ctx.globalAlpha = 0.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z\' fill=\'%23000000\' fill-opacity=\'0.4\'/%3E%3C/svg%3E") 2 22, auto'
    },
    crayon: {
      name: 'Crayon',
      icon: <AutoFixHighIcon />,
      lineWidth: (size) => size * 1.2,
      apply: (ctx) => {
        ctx.globalAlpha = 0.9;
        ctx.lineCap = 'square';
        ctx.lineJoin = 'bevel';
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z\' fill=\'%23000000\' fill-opacity=\'0.4\'/%3E%3C/svg%3E") 12 12, auto'
    },
    eraser: {
      name: 'Eraser',
      icon: <ColorizeIcon />,
      lineWidth: (size) => size * 1.5,
      apply: (ctx, x, y, prevX, prevY) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Crect x=\'8\' y=\'8\' width=\'8\' height=\'8\' fill=\'%23ffffff\' stroke=\'%23000000\' stroke-width=\'1\'/%3E%3C/svg%3E") 12 12, auto'
    }
  }), []);

  // Initialize canvas and set up event listeners
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas size
    const updateCanvasSize = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Set canvas size to match container
      const newWidth = rect.width;
      const newHeight = rect.height;
      
      setCanvasSize({ width: newWidth, height: newHeight });
      
      // Update canvas dimensions
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Restore drawing after resize
      if (drawingHistory.length > 0 && historyIndex >= 0) {
        ctx.putImageData(drawingHistory[historyIndex], 0, 0);
      } else {
        // Clear canvas with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Save initial state
        const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setDrawingHistory([initialState]);
        setHistoryIndex(0);
      }
    };

    // Prevent touch scrolling on canvas
    const preventTouchScroll = (e: TouchEvent) => {
      if (e.target === canvas) {
        e.preventDefault();
      }
    };

    // Add event listeners
    window.addEventListener('resize', updateCanvasSize);
    document.addEventListener('touchmove', preventTouchScroll, { passive: false });

    // Initial setup
    updateCanvasSize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      document.removeEventListener('touchmove', preventTouchScroll);
    };
  }, [drawingHistory, historyIndex]);

  // Handle resize
  const handleResize = () => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Restore drawing after resize
    const ctx = canvas.getContext('2d');
    if (ctx && drawingHistory.length > 0 && historyIndex >= 0) {
      ctx.putImageData(drawingHistory[historyIndex], 0, 0);
    }
  };

  // Start drawing
  const startDrawing = useCallback((x: number, y: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    setLastPosition({ x, y });
    
    // Apply tool settings
    ctx.strokeStyle = selectedTool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = toolOptions[selectedTool].lineWidth(brushSize);
    ctx.globalCompositeOperation = 'source-over'; // Reset composite operation
    
    // Apply tool-specific settings
    toolOptions[selectedTool].apply(ctx);
    
    // Start a new path
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [brushSize, color, selectedTool, toolOptions]);

  // Draw
  const draw = useCallback((x: number, y: number) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Apply tool settings
    ctx.strokeStyle = selectedTool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = toolOptions[selectedTool].lineWidth(brushSize);
    
    // Apply tool-specific settings
    toolOptions[selectedTool].apply(ctx, x, y, lastPosition.x, lastPosition.y);
    
    // Draw line
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // For crayon effect, add some randomness
    if (selectedTool === 'crayon') {
      for (let i = 0; i < 3; i++) {
        const offsetX = (Math.random() - 0.5) * brushSize * 0.5;
        const offsetY = (Math.random() - 0.5) * brushSize * 0.5;
        ctx.beginPath();
        ctx.moveTo(lastPosition.x + offsetX, lastPosition.y + offsetY);
        ctx.lineTo(x + offsetX, y + offsetY);
        ctx.stroke();
      }
    }
    
    setLastPosition({ x, y });
  }, [isDrawing, color, brushSize, selectedTool, lastPosition, toolOptions]);

  // Stop drawing
  const stopDrawing = () => {
    if (!isDrawing || !canvasRef.current) return;
    
    setIsDrawing(false);
    
    // Save the current state to history
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Get current canvas state
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Remove any "redo" states
    const newHistory = drawingHistory.slice(0, historyIndex + 1);
    
    // Add current state to history
    setDrawingHistory([...newHistory, currentState]);
    setHistoryIndex(newHistory.length);
  };

  // Handle mouse/touch events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startDrawing(x, y);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      startDrawing(x, y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    draw(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      draw(x, y);
    }
  };

  // Clear canvas
  const clearCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save cleared state to history
    const clearedState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Add to history
    const newHistory = [...drawingHistory, clearedState];
    setDrawingHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo
  const undo = () => {
    if (historyIndex > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Go back one step in history
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      
      // Apply the previous state
      ctx.putImageData(drawingHistory[newIndex], 0, 0);
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < drawingHistory.length - 1 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Go forward one step in history
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      
      // Apply the next state
      ctx.putImageData(drawingHistory[newIndex], 0, 0);
    }
  };

  // Save drawing
  const saveDrawing = () => {
    if (!canvasRef.current) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.download = 'my-drawing.png';
    link.href = canvasRef.current.toDataURL('image/png');
    
    // Append the link to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBack = () => {
    navigate('/subject/art');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleToolChange = (
    event: React.MouseEvent<HTMLElement>,
    newTool: DrawingTool | null,
  ) => {
    if (newTool !== null) {
      setSelectedTool(newTool);
    }
  };

  if (!selectedProfile || !selectedTheme) {
    return <Box sx={{ p: 4, textAlign: 'center' }}>Loading...</Box>;
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: selectedTheme.gradient,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: 3
    }}>
      {/* Top Navigation */}
      <PageNavigation 
        profile={selectedProfile}
        theme={selectedTheme}
        showTitle={false}
        title="Drawing Board"
        onBackClick={handleBack}
        onHomeClick={handleHome}
      />

      <Box sx={{ 
        flexGrow: 1, 
        mt: 2,
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden' // Prevent scrolling
      }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* Left Sidebar - Color Palette */}
          <Grid item xs={12} sm={1} sx={{ height: '100%' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 1, 
                borderRadius: 2,
                height: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5, fontSize: '0.8rem' }}>
                <PaletteIcon sx={{ mr: 0.5, fontSize: '1rem' }} /> Colors
              </Typography>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 0.5,
                flexGrow: 0,
                pb: 0.5
              }}>
                {colors.map((c) => (
                  <Box
                    key={c}
                    onClick={() => setColor(c)}
                    sx={{
                      width: '100%',
                      aspectRatio: '1/1',
                      bgcolor: c,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: c === color ? '2px solid #000' : '1px solid #ccc',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Main Canvas Area */}
          <Grid item xs={12} sm={11} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              {/* Drawing Tools */}
              <Box sx={{ width: '100%', mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6} md={4}>
                    <ToggleButtonGroup
                      value={selectedTool}
                      exclusive
                      onChange={handleToolChange}
                      aria-label="drawing tool"
                      size="small"
                      sx={{ 
                        width: '100%',
                        '& .MuiToggleButton-root': {
                          flex: 1,
                          border: '1px solid rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <ToggleButton value="brush" aria-label="brush">
                        <BrushIcon />
                      </ToggleButton>
                      <ToggleButton value="pencil" aria-label="pencil">
                        <CreateIcon />
                      </ToggleButton>
                      <ToggleButton value="crayon" aria-label="crayon">
                        <AutoFixHighIcon />
                      </ToggleButton>
                      <ToggleButton value="eraser" aria-label="eraser">
                        <ColorizeIcon />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mr: 2, minWidth: '80px' }}>
                        Brush Size: {brushSize}
                      </Typography>
                      <Slider
                        value={brushSize}
                        onChange={(_, newValue) => setBrushSize(newValue as number)}
                        min={1}
                        max={30}
                        aria-label="Brush Size"
                        sx={{ 
                          color: selectedTheme.textColor,
                          '& .MuiSlider-thumb': {
                            width: 16,
                            height: 16,
                          }
                        }}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={12} md={4}>
                    <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-end' }}>
                      <Button 
                        variant="outlined" 
                        startIcon={<UndoIcon />} 
                        onClick={undo}
                        disabled={historyIndex <= 0}
                        size="small"
                      >
                        Undo
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<RedoIcon />} 
                        onClick={redo}
                        disabled={historyIndex >= drawingHistory.length - 1}
                        size="small"
                      >
                        Redo
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        startIcon={<DeleteIcon />} 
                        onClick={clearCanvas}
                        size="small"
                      >
                        Clear
                      </Button>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<SaveIcon />} 
                        onClick={saveDrawing}
                        size="small"
                      >
                        Save
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
              
              {/* Canvas Container */}
              <Box 
                ref={containerRef}
                sx={{ 
                  flex: 1, 
                  position: 'relative',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                  overflow: 'hidden',
                  boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)'
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={stopDrawing}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    cursor: toolOptions[selectedTool].cursor,
                    touchAction: 'none' // Prevent scrolling on touch devices
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DrawingBoardPage; 