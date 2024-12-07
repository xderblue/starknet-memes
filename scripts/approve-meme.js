const fs = require('fs').promises;
const path = require('path');

async function approveMeme(filename) {
  const pendingPath = path.join(process.cwd(), 'public', 'pending', filename);
  const approvedPath = path.join(process.cwd(), 'public', filename);

  try {
    await fs.rename(pendingPath, approvedPath);
    console.log(`Approved: ${filename}`);
  } catch (error) {
    console.error(`Error approving ${filename}:`, error);
  }
}

// Usage: node scripts/approve-meme.js filename.jpg
const filename = process.argv[2];
if (filename) {
  approveMeme(filename);
} else {
  console.log('Please provide a filename to approve');
}