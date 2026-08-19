const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outputFile = path.join(rootDir, 'MASTER_CODEBASE.md');

const allowedExts = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.sql', '.css', '.html', '.md']);
const ignoreDirs = new Set(['node_modules', '.git', '.next', '.gemini', 'dist', 'build', 'out']);
const ignoreFiles = new Set(['package-lock.json', 'MASTER_CODEBASE.md', 'build-complete-master-codebase.js', '.DS_Store']);

function collectFiles(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoreDirs.has(entry.name)) {
        collectFiles(fullPath, acc);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (allowedExts.has(ext) && !ignoreFiles.has(entry.name) && !entry.name.startsWith('test-device-')) {
        acc.push(fullPath);
      }
    }
  }
  return acc;
}

function getLang(ext) {
  switch (ext) {
    case '.ts': return 'typescript';
    case '.tsx': return 'tsx';
    case '.js': return 'javascript';
    case '.jsx': return 'jsx';
    case '.json': return 'json';
    case '.sql': return 'sql';
    case '.css': return 'css';
    case '.html': return 'html';
    case '.md': return 'markdown';
    default: return 'text';
  }
}

function buildMasterCodebase() {
  const allFiles = collectFiles(rootDir);

  // Logical sorting order
  allFiles.sort((a, b) => {
    const relA = path.relative(rootDir, a).replace(/\\/g, '/');
    const relB = path.relative(rootDir, b).replace(/\\/g, '/');
    return relA.localeCompare(relB);
  });

  let output = `# BALAJI ARCHITECT & INTERIORS — ALL-IN-ONE MASTER CODEBASE

> **Studio Platform**: Architectural Monograph, Bespoke Turnkey Contracting, Spec Material E-Commerce, and Real-Time Studio Operations.  
> **Brand**: BALAJI ARCHITECT & INTERIORS  
> **Studio Address**: Door No. 306, DN TOWER, Floor No. 03, Beltola Tiniali, Guwahati, Assam 781040  
> **Direct Contact**: +91 70029 48484 | atelier@balaji-interior.com  
> **Google Rating**: ★ 5.0 (22 Google Reviews)  
> **Repository**: https://github.com/balajiwebdevelop-hash/Balaji_Web_Dev  
> **Total Source Files Included**: ${allFiles.length}

---

## INDEX OF ALL SOURCE FILES

`;

  allFiles.forEach((file, idx) => {
    const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
    const anchor = relPath.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    output += `${idx + 1}. [\`${relPath}\`](#${anchor})\n`;
  });

  output += `\n---\n\n## COMPLETE SOURCE CODE REPOSITORY\n\n`;

  allFiles.forEach((file) => {
    const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf-8');
    const ext = path.extname(file);
    const lang = getLang(ext);
    const lineCount = content.split('\n').length;
    const sizeKb = (Buffer.byteLength(content, 'utf-8') / 1024).toFixed(1);

    output += `### \`${relPath}\`\n\n`;
    output += `- **File**: \`${relPath}\`\n`;
    output += `- **Size**: ${sizeKb} KB (${lineCount} lines)\n`;
    output += `- **Language**: \`${lang}\`\n\n`;
    output += '```' + lang + '\n';
    output += content;
    if (!content.endsWith('\n')) output += '\n';
    output += '```\n\n---\n\n';
  });

  fs.writeFileSync(outputFile, output, 'utf-8');
  console.log(`Generated MASTER_CODEBASE.md with ${allFiles.length} files (${(fs.statSync(outputFile).size / 1024).toFixed(1)} KB)`);
}

buildMasterCodebase();
