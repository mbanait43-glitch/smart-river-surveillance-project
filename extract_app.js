const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');

const regex = /(["'])(?:(?=(\\?))\2.)*?\1/g;
let matches = [...app.matchAll(regex)].map(m => m[0]);
matches = [...new Set(matches)];

const important = matches.filter(s => {
    s = s.toLowerCase();
    // match typical path indicators or words
    if (s.includes('api') || s.includes('http') || s.includes('station') || s.includes('river')) {
        return true;
    }
    return false;
});

fs.writeFileSync('app_strings.txt', important.join('\n'));
console.log('Saved to app_strings.txt');
