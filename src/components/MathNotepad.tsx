import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BrushIcon from '@mui/icons-material/Brush';

interface Point {
  x: number;
  y: number;
}

interface MathNotepadProps {
  strokeColor?: string;
  profileName?: string;
}

const COLORS = {
  BLACK: '#000000',
  RED: '#f44336',
  GREEN: '#4caf50',
  BLUE: '#2196f3'
};

const GRID_SIZE = 30;

const MathNotepad: React.FC<MathNotepadProps> = ({
  strokeColor = '#2196f3',
  profileName = 'Student'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [selectedColor, setSelectedColor] = useState(COLORS.BLACK);
  const [selectedTool, setSelectedTool] = useState<'pencil' | 'eraser'>('pencil');
  const [lineWidth, setLineWidth] = useState(2);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;

    // Draw vertical lines
    for (let x = GRID_SIZE; x < width; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = GRID_SIZE; y < height; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw margin line
    ctx.strokeStyle = 'rgba(244, 67, 54, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(GRID_SIZE * 2, 0);
    ctx.lineTo(GRID_SIZE * 2, height);
    ctx.stroke();
  };

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.scale(dpr, dpr);
    drawGrid(ctx, rect.width, rect.height);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  const getPoint = (event: { clientX: number; clientY: number } | Touch): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    return {
      x: (event.clientX - rect.left) / dpr,
      y: (event.clientY - rect.top) / dpr
    };
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if ('nativeEvent' in event && event.type === 'mousedown') {
      setIsDrawing(true);
      setLastPoint(getPoint(event.nativeEvent as MouseEvent));
    } else if ('touches' in event && event.touches[0]) {
      setIsDrawing(true);
      setLastPoint(getPoint(event.touches[0]));
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (!isDrawing || !lastPoint || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let currentPoint: Point | null = null;

    if ('nativeEvent' in event && event.type === 'mousemove') {
      currentPoint = getPoint(event.nativeEvent as MouseEvent);
    } else if ('touches' in event && event.touches[0]) {
      currentPoint = getPoint(event.touches[0]);
    }

    if (!currentPoint) return;

    ctx.strokeStyle = selectedTool === 'eraser' ? 'white' : selectedColor;
    ctx.lineWidth = selectedTool === 'eraser' ? 20 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    setLastPoint(currentPoint);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      width: '100%' 
    }}>
      {/* Toolbar */}
      <Box
        sx={{
          p: 2,
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1,
            fontSize: '1.2rem',
            fontWeight: 'medium',
            color: '#666',
            minWidth: '150px'
          }}
        >
          {profileName}'s Notebook
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 0.5, 
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: 1,
            p: 0.5
          }}>
            <Tooltip title="Pencil">
              <IconButton 
                size="small"
                onClick={() => {
                  setSelectedTool('pencil');
                  setLineWidth(2);
                }}
                sx={{
                  backgroundColor: selectedTool === 'pencil' ? 'rgba(0,0,0,0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedTool === 'pencil' ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.07)'
                  }
                }}
              >
                <CreateIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Eraser">
              <IconButton 
                size="small"
                onClick={() => setSelectedTool('eraser')}
                sx={{
                  backgroundColor: selectedTool === 'eraser' ? 'rgba(0,0,0,0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedTool === 'eraser' ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.07)'
                  }
                }}
              >
                <AutoFixHighIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 0.5, 
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: 1,
            p: 0.5
          }}>
            {Object.entries(COLORS).map(([name, color]) => (
              <Tooltip key={name} title={name.toLowerCase()}>
                <IconButton 
                  size="small"
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedTool('pencil');
                  }}
                  sx={{
                    color: color,
                    backgroundColor: selectedColor === color && selectedTool === 'pencil' 
                      ? 'rgba(0,0,0,0.1)' 
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.07)'
                    }
                  }}
                >
                  <BrushIcon />
                </IconButton>
              </Tooltip>
            ))}
          </Box>

          <Tooltip title="Clear All">
            <IconButton 
              size="small"
              onClick={initCanvas}
              sx={{ 
                backgroundColor: 'rgba(0,0,0,0.05)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.1)'
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Canvas */}
      <Box sx={{ 
        flex: 1, 
        position: 'relative',
        backgroundColor: 'white',
        overflow: 'hidden'
      }}>
        <canvas
          ref={canvasRef}
          style={{
            touchAction: 'none',
            width: '100%',
            height: '100%'
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </Box>
    </Box>
  );
};

export default MathNotepad; 