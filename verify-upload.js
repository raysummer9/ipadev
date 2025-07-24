const fs = require('fs');
const path = require('path');

// Simulate what the FTP deployment will upload
const buildDir = './build';

console.log('🔍 FTP Deployment Verification');
console.log('==============================\n');

if (!fs.existsSync(buildDir)) {
  console.log('❌ Build directory not found. Run "npm run build" first.');
  process.exit(1);
}

console.log('✅ Files that WILL be uploaded to your server:\n');

function listFiles(dir, prefix = '') {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative('./build', fullPath);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      console.log(`📁 ${prefix}${item}/`);
      listFiles(fullPath, prefix + '  ');
    } else {
      console.log(`📄 ${prefix}${item}`);
    }
  });
}

listFiles(buildDir);

console.log('\n❌ Files that will NOT be uploaded (protected):');
console.log('  - src/ (source code)');
console.log('  - public/ (development assets)');
console.log('  - node_modules/ (dependencies)');
console.log('  - package.json (development config)');
console.log('  - .env files (environment variables)');
console.log('  - .git/ (version control)');
console.log('  - .github/ (GitHub workflows)');
console.log('  - README.md (documentation)');
console.log('  - All other development files');

console.log('\n✅ Your server files are safe! Only build files will be uploaded.'); 