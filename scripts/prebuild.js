const fs = require('fs');
const path = require('path');

/**
 * Prebuild script to isolate instance assets.
 * Copies everything from instances/[INSTANCE_ID]/public to the root public/ directory.
 */

const INSTANCE_ID = process.env.INSTANCE_ID || process.env.NEXT_PUBLIC_INSTANCE_ID || 'scodrinon';

console.log(`[prebuild] Active Instance: ${INSTANCE_ID}`);

const sourceDir = path.join(process.cwd(), 'instances', INSTANCE_ID, 'public');
const targetDir = path.join(process.cwd(), 'public');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // console.log(`[prebuild] Copying ${path.relative(process.cwd(), src)} -> ${path.relative(process.cwd(), dest)}`);
    fs.copyFileSync(src, dest);
  }
}

if (!fs.existsSync(sourceDir)) {
  console.error(`[prebuild] Error: Source directory ${sourceDir} does not exist.`);
  process.exit(1);
}

// Optional: Clear target directory (be careful if there are shared assets that aren't in any instance)
// For now, we just overwrite.

try {
  copyRecursiveSync(sourceDir, targetDir);
  console.log(`[prebuild] Successfully isolated assets for ${INSTANCE_ID}`);
} catch (err) {
  console.error('[prebuild] Failed to copy assets:', err);
  process.exit(1);
}
