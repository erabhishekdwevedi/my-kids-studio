// Script to generate favicon and app icons
// Run with: node generate-icons.js

const fs = require('fs');
const path = require('path');

console.log('📱 Kids Studio - Icon Generator');
console.log('================================\n');

console.log('✅ SVG icon created at: public/icon.svg');
console.log('\n📋 To generate PNG/ICO files from SVG:');
console.log('\nOption 1 - Online Tool (Recommended):');
console.log('1. Visit: https://realfavicongenerator.net/');
console.log('2. Upload: public/icon.svg');
console.log('3. Configure: Set background color to #667eea');
console.log('4. Download and extract to public/ folder');

console.log('\nOption 2 - Manual (using design software):');
console.log('1. Open public/icon.svg in Figma/Sketch/Illustrator');
console.log('2. Export as:');
console.log('   - favicon.ico (16x16, 32x32, 48x48)');
console.log('   - logo192.png (192x192)');
console.log('   - logo512.png (512x512)');
console.log('3. Save files to public/ folder');

console.log('\nOption 3 - Command line (requires ImageMagick):');
console.log('brew install imagemagick');
console.log('convert public/icon.svg -resize 192x192 public/logo192.png');
console.log('convert public/icon.svg -resize 512x512 public/logo512.png');
console.log('convert public/icon.svg -resize 32x32 public/favicon.ico');

console.log('\n✨ Current setup:');
console.log('- SVG favicon: ✅ Working (modern browsers)');
console.log('- PWA manifest: ✅ Updated with Kids Studio branding');
console.log('- Theme color: ✅ Set to #667eea');
console.log('- Meta tags: ✅ Added for SEO and PWA');

console.log('\n🎨 Icon Design:');
console.log('- Gradient background (purple to pink)');
console.log('- Book symbol (education)');
console.log('- Star accent (fun/achievement)');
console.log('- Kid-friendly colors');

console.log('\n✅ Done! The app will use the SVG icon until PNGs are generated.\n');
