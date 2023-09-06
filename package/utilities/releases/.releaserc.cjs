const fs = require('fs');
const path = require('path');
const { gitmojis } = require('gitmojis');

const template = fs.readFileSync(path.join(__dirname, './default-template-semver.hbs'), 'utf-8');
const commitTemplate = fs.readFileSync(path.join(__dirname, './commit-template.hbs'), 'utf-8');

/**
 * Generate release rules = require(gitmoji)s
 */
const releaseRules = {
  major: gitmojis.filter(({ semver }) => semver === 'major').map(({ code }) => code),
  minor: gitmojis.filter(({ semver }) => semver === 'minor').map(({ code }) => code).concat(':new:'),
  patch: gitmojis.filter(({ semver }) => (semver === 'patch' || semver === null)).map(({ code }) => code),
};

module.exports = {
  branches: [
    { name: 'main', channel: 'latest', prerelease: false },
  ],
  debug: true,
  plugins: [
    [
      'semantic-release-gitmoji',
      {
        releaseRules,
        releaseNotes: {
          semver: true,
          template,
          partials: {
            commitTemplate,
          },
        }
      }
    ],
  ]
}