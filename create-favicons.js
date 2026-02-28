const fs = require('fs');
const path = require('path');

// Create a simple HTML page that can generate the images
const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Kids Studio Icon Generator</title></head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <h2>Kids Studio - Generate Favicons</h2>
  <p>Click the buttons below to download:</p>
  <div id="images"></div>

  <script>
    function createIcon(size, emoji) {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(0.5, '#764ba2');
      gradient.addColorStop(1, '#f093fb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // Emoji
      ctx.font = \`bold \${size * 0.65}px Arial\`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, size / 2, size / 2);

      return canvas;
    }

    const sizes = [
      { size: 512, name: 'logo512.png', emoji: '🎨' },
      { size: 192, name: 'logo192.png', emoji: '🎨' },
      { size: 32, name: 'favicon-32x32.png', emoji: '🎨' }
    ];

    const container = document.getElementById('images');

    sizes.forEach(({ size, name, emoji }) => {
      const canvas = createIcon(size, emoji);
      const link = document.createElement('a');
      link.download = name;
      link.href = canvas.toDataURL('image/png');
      link.textContent = \`Download \${name}\`;
      link.style.display = 'block';
      link.style.margin = '10px 0';
      link.style.padding = '10px';
      link.style.background = '#667eea';
      link.style.color = 'white';
      link.style.textDecoration = 'none';
      link.style.borderRadius = '5px';
      link.style.width = '200px';
      container.appendChild(link);

      const preview = document.createElement('img');
      preview.src = canvas.toDataURL('image/png');
      preview.width = Math.min(size, 100);
      preview.style.marginLeft = '20px';
      preview.style.border = '2px solid #ddd';
      preview.style.borderRadius = '5px';
      link.appendChild(preview);
    });

    console.log('✅ Favicon generator ready!');
    console.log('📋 Click the download links above to save the icon files.');
    console.log('💾 Save them to the public/ folder of your project.');
  </script>
</body>
</html>
`;

// Save the HTML file
const outputPath = path.join(__dirname, 'public', 'generate-favicons.html');
fs.writeFileSync(outputPath, htmlContent);

console.log('\n🎨 Kids Studio - Favicon Generator Created!');
console.log('===========================================\n');
console.log('✅ File created: public/generate-favicons.html\n');
console.log('📋 Instructions:');
console.log('1. Start your dev server: npm start');
console.log('2. Open: http://localhost:3000/generate-favicons.html');
console.log('3. Click the download buttons to get:');
console.log('   - logo512.png (512x512)');
console.log('   - logo192.png (192x192)');
console.log('   - favicon-32x32.png (32x32)');
console.log('4. Save the downloaded files to the public/ folder\n');
console.log('💡 The app is already using an emoji favicon (🎨) as fallback!');
console.log('✨ PWA manifest is updated with Kids Studio branding\n');
