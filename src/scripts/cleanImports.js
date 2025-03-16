/**
 * This script helps clean up unused imports in TypeScript/JavaScript files.
 * It's meant to be run manually when needed, not as part of the build process.
 * 
 * Usage:
 * 1. Run with Node.js: node src/scripts/cleanImports.js
 * 2. The script will analyze files and suggest changes
 * 3. You can then apply the changes manually or use the --fix flag to apply them automatically
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  rootDir: path.resolve(__dirname, '..'),
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  ignoreDirs: ['node_modules', 'build', 'dist', 'scripts'],
  fix: process.argv.includes('--fix'),
  verbose: process.argv.includes('--verbose'),
};

// Helper to check if a path should be ignored
const shouldIgnore = (filePath) => {
  return config.ignoreDirs.some(dir => filePath.includes(`/${dir}/`));
};

// Find all TypeScript/JavaScript files
const findFiles = (dir) => {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !shouldIgnore(filePath)) {
      results = results.concat(findFiles(filePath));
    } else if (stat.isFile() && config.extensions.includes(path.extname(file))) {
      results.push(filePath);
    }
  }
  
  return results;
};

// Parse imports from a file
const parseImports = (content) => {
  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g;
  const defaultImportRegex = /import\s+([^{},\s]+)\s+from\s+['"]([^'"]+)['"]/g;
  const imports = [];
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importedItems = match[1].split(',').map(item => item.trim());
    const source = match[2];
    
    for (const item of importedItems) {
      if (item) {
        imports.push({
          name: item,
          source,
          type: 'named',
          fullMatch: match[0],
        });
      }
    }
  }
  
  while ((match = defaultImportRegex.exec(content)) !== null) {
    imports.push({
      name: match[1],
      source: match[2],
      type: 'default',
      fullMatch: match[0],
    });
  }
  
  return imports;
};

// Check if an import is used in the file
const isImportUsed = (content, importName) => {
  // Remove the import declaration itself
  const contentWithoutImports = content.replace(/import[^;]+;/g, '');
  
  // Create a regex that matches the import name as a whole word
  const regex = new RegExp(`\\b${importName}\\b`, 'g');
  
  return regex.test(contentWithoutImports);
};

// Process a file to find unused imports
const processFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const imports = parseImports(content);
  const unusedImports = [];
  
  for (const importItem of imports) {
    if (!isImportUsed(content, importItem.name)) {
      unusedImports.push(importItem);
    }
  }
  
  return { filePath, unusedImports };
};

// Remove unused imports from a file
const removeUnusedImports = (filePath, unusedImports) => {
  if (unusedImports.length === 0) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Group unused imports by source
  const importsBySource = {};
  for (const imp of unusedImports) {
    if (!importsBySource[imp.source]) {
      importsBySource[imp.source] = [];
    }
    importsBySource[imp.source].push(imp);
  }
  
  // Process each source
  for (const source in importsBySource) {
    const importsFromSource = importsBySource[source];
    
    // Get all imports from this source
    const importRegex = new RegExp(`import\\s+{([^}]+)}\\s+from\\s+['"]${source}['"]`, 'g');
    const match = importRegex.exec(content);
    
    if (match) {
      const importedItems = match[1].split(',').map(item => item.trim());
      const remainingItems = importedItems.filter(item => 
        !importsFromSource.some(imp => imp.name === item)
      );
      
      if (remainingItems.length === 0) {
        // Remove the entire import statement
        content = content.replace(match[0], '');
      } else {
        // Update the import statement with only the used imports
        const newImport = `import { ${remainingItems.join(', ')} } from '${source}'`;
        content = content.replace(match[0], newImport);
      }
    }
  }
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${filePath}`);
};

// Main function
const main = () => {
  console.log(`🔍 Scanning for unused imports in ${config.rootDir}...`);
  
  const files = findFiles(config.rootDir);
  console.log(`Found ${files.length} files to analyze.`);
  
  let totalUnusedImports = 0;
  const filesToFix = [];
  
  for (const file of files) {
    const { filePath, unusedImports } = processFile(file);
    
    if (unusedImports.length > 0) {
      totalUnusedImports += unusedImports.length;
      filesToFix.push({ filePath, unusedImports });
      
      if (config.verbose || !config.fix) {
        console.log(`\n📄 ${path.relative(config.rootDir, filePath)}`);
        for (const imp of unusedImports) {
          console.log(`  - Unused import: ${imp.name} from ${imp.source}`);
        }
      }
    }
  }
  
  console.log(`\n🔎 Found ${totalUnusedImports} unused imports in ${filesToFix.length} files.`);
  
  if (config.fix) {
    console.log('\n🔧 Fixing unused imports...');
    for (const { filePath, unusedImports } of filesToFix) {
      removeUnusedImports(filePath, unusedImports);
    }
    console.log(`\n✅ Fixed ${filesToFix.length} files.`);
  } else {
    console.log('\n💡 Run with --fix to automatically remove unused imports.');
  }
};

// Run the script
main(); 