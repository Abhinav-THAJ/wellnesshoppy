const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
  });
  return results;
}

const files = walk('./src');

const replacements = [
  { search: /bg-\[\#111827\]/g, replace: 'bg-primary' },
  { search: /text-\[\#111827\]/g, replace: 'text-primary' },
  { search: /border-\[\#111827\]/g, replace: 'border-primary' },
  { search: /bg-\[\#2563EB\]/g, replace: 'bg-secondary' },
  { search: /text-\[\#2563EB\]/g, replace: 'text-secondary' },
  { search: /border-\[\#2563EB\]/g, replace: 'border-secondary' },
  { search: /bg-\[\#212121\]/g, replace: 'bg-primary' },
  { search: /border-\[\#333333\]/g, replace: 'border-muted' },
  { search: /bg-\[\#333333\]/g, replace: 'bg-muted' },
  { search: /text-\[\#F9FAFB\]/g, replace: 'text-primary-foreground' },
  { search: /hover:bg-\[\#2563EB\]/g, replace: 'hover:bg-secondary/90' },
  { search: /hover:bg-\[\#111827\]/g, replace: 'hover:bg-primary/90' },
  { search: /hover:text-\[\#2563EB\]/g, replace: 'hover:text-secondary' },
  
  // also replace gray colors which might be used as background
  { search: /bg-gray-900/g, replace: 'bg-primary' },
  { search: /bg-gray-800/g, replace: 'bg-primary' },
  { search: /bg-gray-100/g, replace: 'bg-muted' },
  { search: /bg-gray-50/g, replace: 'bg-background' },
  { search: /text-gray-900/g, replace: 'text-primary' },
  { search: /text-gray-800/g, replace: 'text-primary' },
  { search: /text-gray-600/g, replace: 'text-muted-foreground' },
  { search: /text-gray-500/g, replace: 'text-muted-foreground' },
  
  { search: /text-blue-600/g, replace: 'text-secondary' },
  { search: /bg-blue-600/g, replace: 'bg-secondary' },
  { search: /hover:bg-blue-700/g, replace: 'hover:bg-secondary/90' },
];

let changedFiles = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.search, r.replace);
  });
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log('Updated: ' + file);
  }
});

console.log('Changed files:', changedFiles);
