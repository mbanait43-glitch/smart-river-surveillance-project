const fs = require('fs');
const index = fs.readFileSync('index.js', 'utf8');
const regex = /"(\/(?:api|v1|v2|cpcb|station|river)[a-zA-Z0-9_\-\/]*)"/gi;
const matches = [...index.matchAll(regex)].map(m => m[1]);
console.log("From index.js:", [...new Set(matches)]);

const vendor = fs.readFileSync('vendor.js', 'utf8');
const vendorMatches = [...vendor.matchAll(regex)].map(m => m[1]);
console.log("From vendor.js:", [...new Set(vendorMatches)]);

// Also let's extract ANY url that starts with http
const httpRegex = /"(https?:\/\/[a-zA-Z0-9\-\.]+[a-zA-Z0-9\-\/_\?\=\&]*)"/gi;
const httpMatches = [...index.matchAll(httpRegex)].map(m => m[1]);
console.log("HTTP index.js:", [...new Set(httpMatches)]);
const httpVendorMatches = [...vendor.matchAll(httpRegex)].map(m => m[1]);
console.log("HTTP vendor.js:", [...new Set(httpVendorMatches)]);
