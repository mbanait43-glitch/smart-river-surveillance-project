const fs = require('fs');
const index = fs.readFileSync('index.js', 'utf8');
const vendor = fs.readFileSync('vendor.js', 'utf8');

// Match all string literals
const regex = /(["'])(?:(?=(\\?))\2.)*?\1/g;
let matches = [...index.matchAll(regex)].map(m => m[0]);
matches = [...new Set(matches)];

const important = matches.filter(s => {
    s = s.toLowerCase();
    return s.includes('api') || s.includes('station') || s.includes('water') || s.includes('river') || s.includes('cpcb') || s.includes('data');
});

fs.writeFileSync('strings.txt', important.join('\n'));
console.log('Saved to strings.txt');
