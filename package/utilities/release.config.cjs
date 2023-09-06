// import { gitmojis } from 'gitmojis';
const { gitmojis } = require('gitmojis');

/**
 * Generate release rules from gitmojis
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
  tagFormat: 'storydocker-utilities@${version}',
  plugins: [
    [
      'semantic-release-gitmoji',
      {
        tagFormat: 'storydocker-utilities@${version}',
        releaseRules,
        releaseNotes: {
          semver: true,
        }
      }
    ],
    ["@semantic-release/exec", {
      "generateNotesCmd": "echo ${JSON.stringify(nextRelease)}"
    }],
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