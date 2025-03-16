/**
 * This file provides guidance on optimizing imports for better tree-shaking
 * and reducing bundle size. It's meant to be used as a reference for developers.
 */

import logger from './logger';

const log = logger.createLogger('ImportOptimizer');

/**
 * Optimized Material-UI imports
 * 
 * INSTEAD OF:
 * import { Button, TextField, Typography } from '@mui/material';
 * 
 * USE:
 * import Button from '@mui/material/Button';
 * import TextField from '@mui/material/TextField';
 * import Typography from '@mui/material/Typography';
 * 
 * This allows for better tree-shaking and reduces bundle size.
 */

/**
 * Common Material-UI components and their optimized import paths
 */
export const MUI_COMPONENT_PATHS = {
  // Layout
  Box: '@mui/material/Box',
  Container: '@mui/material/Container',
  Grid: '@mui/material/Grid',
  Stack: '@mui/material/Stack',
  
  // Inputs
  Button: '@mui/material/Button',
  TextField: '@mui/material/TextField',
  Select: '@mui/material/Select',
  Checkbox: '@mui/material/Checkbox',
  Radio: '@mui/material/Radio',
  
  // Display
  Typography: '@mui/material/Typography',
  Avatar: '@mui/material/Avatar',
  Icon: '@mui/material/Icon',
  Divider: '@mui/material/Divider',
  
  // Feedback
  CircularProgress: '@mui/material/CircularProgress',
  LinearProgress: '@mui/material/LinearProgress',
  Snackbar: '@mui/material/Snackbar',
  Alert: '@mui/material/Alert',
  
  // Surfaces
  Paper: '@mui/material/Paper',
  Card: '@mui/material/Card',
  AppBar: '@mui/material/AppBar',
  Drawer: '@mui/material/Drawer',
  
  // Navigation
  Tabs: '@mui/material/Tabs',
  Tab: '@mui/material/Tab',
  BottomNavigation: '@mui/material/BottomNavigation',
  
  // Utils
  Modal: '@mui/material/Modal',
  Popover: '@mui/material/Popover',
  Tooltip: '@mui/material/Tooltip',
  
  // Data Display
  Table: '@mui/material/Table',
  List: '@mui/material/List',
  
  // Misc
  Fab: '@mui/material/Fab',
  Badge: '@mui/material/Badge',
  Chip: '@mui/material/Chip',
};

/**
 * Analyzes a component's imports and logs recommendations for optimization
 * This is a development utility and should not be used in production
 * 
 * @param imports - Array of imported component names
 * @param filePath - Path of the file being analyzed
 */
export const analyzeImports = (imports: string[], filePath: string): void => {
  if (process.env.NODE_ENV === 'production') return;
  
  const optimizableImports = imports.filter(imp => Object.keys(MUI_COMPONENT_PATHS).includes(imp));
  
  if (optimizableImports.length > 0) {
    log.info(`File ${filePath} has ${optimizableImports.length} Material-UI imports that could be optimized`, {
      file: filePath,
      imports: optimizableImports,
    });
    
    log.info('Recommended optimized imports:', {
      current: `import { ${optimizableImports.join(', ')} } from '@mui/material';`,
      optimized: optimizableImports.map(imp => 
        `import ${imp} from '${MUI_COMPONENT_PATHS[imp as keyof typeof MUI_COMPONENT_PATHS]}';`
      ).join('\n'),
    });
  }
};

export default {
  MUI_COMPONENT_PATHS,
  analyzeImports,
}; 