const request = require('request');
const { writeFileSync } = require('fs');

/**
 * Writes the version.ts file during a release with semantic release
 * Usage:
 * node version.js <version-string> <short-hash> <long-hash>
 */

lastVersion = process.argv[2];

let url = `https://github.com/DanielHabenicht/phonebook/releases/download/${lastVersion}/changelog.md`;

request.get(url, (err, res, body) => {
  if (err) {
    throw new Error('Failed to fetch Changelog!', err);
  }
  writeFileSync('src/changelog.md', body, { encoding: 'utf-8' });
  console.log(`Fetched Changelog from: ${url}`);
});
