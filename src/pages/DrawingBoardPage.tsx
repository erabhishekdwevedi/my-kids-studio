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
import TopMenu from '../components/TopMenu';

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
      icon: <GestureIcon />,
      lineWidth: (size) => size * 1.2,
      apply: (ctx, x, y, prevX, prevY) => {
        ctx.globalAlpha = 0.9;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Create crayon texture effect
        if (x === undefined || y === undefined || prevX === undefined || prevY === undefined) return;
        
        const length = Math.sqrt(Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2));
        
        if (length < 1) return;
        
        const noise = 0.5;
        const angle = Math.atan2(y - prevY, x - prevX);
        
        // Draw multiple offset lines for texture
        for (let i = 0; i < 3; i++) {
          const offset = (Math.random() - 0.5) * noise;
          ctx.beginPath();
          ctx.moveTo(
            prevX + Math.cos(angle - Math.PI/2) * offset,
            prevY + Math.sin(angle - Math.PI/2) * offset
          );
          ctx.lineTo(
            x + Math.cos(angle - Math.PI/2) * offset,
            y + Math.sin(angle - Math.PI/2) * offset
          );
          ctx.stroke();
        }
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z\' fill=\'%23ff9800\' fill-opacity=\'0.6\'/%3E%3C/svg%3E") 2 22, auto'
    },
    eraser: {
      name: 'Eraser',
      icon: <AutoFixHighIcon />,
      lineWidth: (size) => size * 1.5,
      apply: (ctx) => {
        ctx.globalAlpha = 1;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = 'destination-out';
      },
      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Crect x=\'6\' y=\'6\' width=\'12\' height=\'12\' fill=\'%23ffffff\' stroke=\'%23000000\' stroke-width=\'1\'/%3E%3C/svg%3E") 12 12, auto'
    }
  }), []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Only initialize if canvas has valid dimensions
    if (canvas.width > 0 && canvas.height > 0) {
      // Set canvas background to white
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Save initial state
      const initialState = context.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingHistory([initialState]);
      setHistoryIndex(0);
    }
  }, [canvasSize]);

  // Prevent touch scrolling on the entire document when drawing
  useEffect(() => {
    const preventTouchScroll = (e: TouchEvent) => {
      if (isDrawing) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventTouchScroll, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventTouchScroll);
    };
  }, [isDrawing]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Use the container's height instead of a percentage of viewport height
        const containerHeight = containerRef.current.clientHeight;
        
        setCanvasSize({
          width: containerWidth - 20, // Subtract padding
          height: containerHeight - 20 // Subtract padding
        });
      }
    };

    // Initial size calculation
    handleResize();
    
    // Set up resize listener
    window.addEventListener('resize', handleResize);
    
    // Create a ResizeObserver to detect container size changes
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  // Start drawing
  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    setIsDrawing(true);
    
    // Get coordinates
    let clientX, clientY;
    if ('touches' in e) {
      e.preventDefault(); // Prevent scrolling on touch devices
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Set drawing properties based on selected tool
    context.strokeStyle = color;
    context.lineWidth = toolOptions[selectedTool].lineWidth(brushSize);
    
    // Reset composite operation (for after using eraser)
    context.globalCompositeOperation = 'source-over';
    
    // Apply tool-specific settings
    toolOptions[selectedTool].apply(context);
    
    // For single dot
    context.beginPath();
    context.arc(x, y, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();
    
    setLastPosition({ x, y });
  }, [canvasRef, color, selectedTool, brushSize, toolOptions]);

  // Draw
  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current || !lastPosition) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Get coordinates
    let clientX, clientY;
    if ('touches' in e) {
      e.preventDefault(); // Prevent scrolling on touch devices
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Set drawing properties
    context.strokeStyle = color;
    context.lineWidth = toolOptions[selectedTool].lineWidth(brushSize);
    
    // Reset composite operation (for after using eraser)
    context.globalCompositeOperation = 'source-over';
    
    // Apply tool-specific settings and draw
    if (selectedTool === 'crayon') {
      toolOptions[selectedTool].apply(context, x, y, lastPosition.x, lastPosition.y);
    } else {
      toolOptions[selectedTool].apply(context);
      
      // Draw line
      context.beginPath();
      context.moveTo(lastPosition.x, lastPosition.y);
      context.lineTo(x, y);
      context.stroke();
    }
    
    setLastPosition({ x, y });
  }, [isDrawing, canvasRef, lastPosition, color, selectedTool, brushSize, toolOptions]);

  const stopDrawing = () => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.closePath();
    context.globalAlpha = 1; // Reset alpha
    context.shadowBlur = 0; // Reset shadow
    setIsDrawing(false);

    // Save current state to history
    const currentState = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // Remove any states after current index (if we've undone and then drawn something new)
    const newHistory = drawingHistory.slice(0, historyIndex + 1);
    
    setDrawingHistory([...newHistory, currentState]);
    setHistoryIndex(newHistory.length);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Save cleared state to history
    const clearedState = context.getImageData(0, 0, canvas.width, canvas.height);
    setDrawingHistory([...drawingHistory, clearedState]);
    setHistoryIndex(drawingHistory.length);
  };

  const undo = () => {
    if (historyIndex <= 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const newIndex = historyIndex - 1;
    context.putImageData(drawingHistory[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  };

  const redo = () => {
    if (historyIndex >= drawingHistory.length - 1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const newIndex = historyIndex + 1;
    context.putImageData(drawingHistory[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  };

  const saveDrawing = () => {
    if (!canvasRef.current) return;
    
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Set the download attribute with a filename
    link.download = `drawing-${new Date().toISOString().slice(0, 10)}.png`;
    
    // Convert the canvas to a data URL and set it as the href
    link.href = canvasRef.current.toDataURL('image/png');
    
    // Append the link to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBack = () => {
    navigate(-1);
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

  return (
    <Box sx={{ 
      height: '100vh', 
      bgcolor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden' // Prevent scrolling on the main container
    }}>
      {/* Top Navigation */}
      <TopMenu title="Drawing Board" showTitle={true} />

      <Box sx={{ 
        flexGrow: 1, 
        p: 2, 
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
                  <Grid item>
                    <ToggleButtonGroup
                      value={selectedTool}
                      exclusive
                      onChange={handleToolChange}
                      aria-label="drawing tool"
                    >
                      {Object.entries(toolOptions).map(([toolKey, tool]) => (
                        <ToggleButton 
                          key={toolKey} 
                          value={toolKey as DrawingTool}
                          aria-label={tool.name}
                        >
                          {tool.icon}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Grid>
                  <Grid item xs>
                    <Box sx={{ px: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Brush Size
                      </Typography>
                      <Slider
                        value={brushSize}
                        onChange={(_, newValue) => setBrushSize(newValue as number)}
                        min={1}
                        max={30}
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Stack direction="row" spacing={1}>
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
                        variant="contained" 
                        color="success" 
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

              {/* Canvas */}
              <Box 
                ref={containerRef}
                sx={{ 
                  width: '100%', 
                  flexGrow: 1,
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 2,
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  overflow: 'hidden' // Prevent scrolling
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  style={{ 
                    touchAction: 'none', // Prevent scrolling on touch devices
                    display: 'block',
                    cursor: toolOptions[selectedTool].cursor
                  }}
                />
              </Box>

              {/* Tool Info */}
              <Box sx={{ width: '100%', mt: 1 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  Currently using: <strong>{toolOptions[selectedTool].name}</strong> | 
                  Color: <Box component="span" sx={{ 
                    display: 'inline-block', 
                    width: 12, 
                    height: 12, 
                    bgcolor: selectedTool === 'eraser' ? '#ffffff' : color,
                    border: '1px solid #ccc',
                    verticalAlign: 'middle',
                    mx: 0.5
                  }}></Box> | 
                  Size: {brushSize}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Status Bar */}
      <Box sx={{ 
        p: 1, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        backgroundColor: '#e0e0e0',
        fontSize: '0.875rem'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">
            Tool: {toolOptions[selectedTool].name}
          </Typography>
          <Box sx={{ 
            width: 16, 
            height: 16, 
            borderRadius: '50%', 
            backgroundColor: color,
            border: '1px solid #999',
            display: 'inline-block',
            marginLeft: 1,
            marginRight: 1
          }} />
          <Typography variant="body2">
            Size: {brushSize}px
          </Typography>
        </Box>
        
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          {isDrawing ? 'Drawing...' : 'Ready'}
        </Typography>
      </Box>
    </Box>
  );
};

export default DrawingBoardPage; 