const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');

const regex = /(["'`])((?:(?=(\\?))\3.)*?)\1/g;
let matches = [...app.matchAll(regex)].map(m => m[2]);
matches = [...new Set(matches)];

fs.writeFileSync('all_strings.txt', matches.join('\n'));
console.log('Saved to all_strings.txt, total unique strings: ' + matches.length);
