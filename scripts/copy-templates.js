const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const projectRoot = path.resolve(__dirname, '..');
const srcTemplates = path.join(projectRoot, 'src', 'shared', 'mailer', 'templates');
const distTemplates = path.join(projectRoot, 'dist', 'shared', 'mailer', 'templates');

try {
  copyDir(srcTemplates, distTemplates);
  console.log('Templates copied to', distTemplates);
} catch (err) {
  console.error('Failed to copy templates:', err);
  process.exitCode = 1;
}
