// Drawing Board App - World-Class
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, alpha, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import AppNavigation from '../../components/AppNavigation';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';

const GRADIENT = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#95E1D3', '#FFD93D',
  '#C77DFF', '#FF9F1C', '#FF6B9D', '#A0522D',
  '#333333', '#FFFFFF'
];

const BRUSH_SIZES = [2, 5, 10, 15, 20];

const DrawingBoardApp: React.FC = () => {
  const [score, setScore] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;

    // Fill with white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial state
    saveToHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only init, color/brushSize set in separate effect
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-9), imageData]); // Keep last 10 states
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
    setScore(score + 1);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      saveToHistory();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const undo = () => {
    if (history.length <= 1) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const newHistory = history.slice(0, -1);
    const previousState = newHistory[newHistory.length - 1];

    context.putImageData(previousState, 0, 0);
    setHistory(newHistory);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <AppNavigation appName="Drawing Board 🎨" score={score} gradient={GRADIENT} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h2" align="center" fontWeight={700} mb={1} sx={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Drawing Board 🎨
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" mb={3}>
            Draw your imagination!
          </Typography>
        </motion.div>

        <Box sx={{ background: alpha('#ffffff', 0.95), backdropFilter: 'blur(20px)', borderRadius: 4, p: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          {/* Tools Bar */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Colors */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" fontWeight={600} sx={{ mr: 1, alignSelf: 'center' }}>
                Colors:
              </Typography>
              {COLORS.map((c) => (
                <motion.div key={c} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Box
                    onClick={() => setColor(c)}
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: c,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: color === c ? '4px solid #333' : '2px solid #ccc',
                      boxShadow: color === c ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.1)',
                    }}
                  />
                </motion.div>
              ))}
            </Box>

            {/* Brush Sizes */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2" fontWeight={600} sx={{ mr: 1 }}>
                Size:
              </Typography>
              {BRUSH_SIZES.map((size) => (
                <motion.div key={size} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Box
                    onClick={() => setBrushSize(size)}
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      border: brushSize === size ? '3px solid #333' : '2px solid #ccc',
                      bgcolor: brushSize === size ? alpha('#667eea', 0.2) : 'transparent',
                    }}
                  >
                    <Box
                      sx={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        bgcolor: color,
                      }}
                    />
                  </Box>
                </motion.div>
              ))}
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={undo} color="primary" disabled={history.length <= 1}>
                <UndoIcon />
              </IconButton>
              <IconButton onClick={clearCanvas} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Canvas */}
          <Box sx={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{
                border: '3px solid #333',
                borderRadius: '8px',
                cursor: 'crosshair',
                touchAction: 'none',
                maxWidth: '100%'
              }}
            />
          </Box>
        </Box>

        {/* Instructions */}
        <Box sx={{ mt: 3, background: alpha('#fff', 0.9), borderRadius: 3, p: 2, textAlign: 'center' }}>
          <Typography variant="body1" fontWeight={600}>
            🖌️ Choose a color and brush size, then draw on the canvas! Use undo or clear to start over.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DrawingBoardApp;
