const fs = require('fs');
const path = require('path');
const { gitmojis } = require('gitmojis');

const template = fs.readFileSync(path.join(__dirname, './default-template-semver.hbs'), 'utf-8');
const commitTemplate = fs.readFileSync(path.join(__dirname, './commit-template.hbs'), 'utf-8');

delete require.cache['semantic-release-gitmoji'];
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
  tagFormat: 'scottnath-experiments-a@${version}',
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
    // ["@semantic-release/exec", {
    //   "generateNotesCmd": "echo ${JSON.stringify(nextRelease)}"
    // }],
    // [
    //   "@semantic-release/github",
    //   {
    //     "successComment": false,
    //     "failComment": false
    //   }
    // ],
    // [
    //   "@semantic-release/git",
    //   {
    //     "message": "chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}"
    //   }
    // ],
    // '@semantic-release/npm',
  ]
}