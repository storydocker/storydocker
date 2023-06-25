import { gitmojis } from 'gitmojis';

module.exports = {
  branches: [
    { name: 'main' },
    { name: "utilities", channel: "next" }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm',
    [
      'semantic-release-gitmoji',
      {
        tagFormat: 'storydocker-utilities@v${version}',
        releaseRules: {
          major: gitmojis.filter(({ semver }) => semver === 'major').map(({ code }) => code),
          minor: gitmojis.filter(({ semver }) => semver === 'minor').map(({ code }) => code),
          patch: gitmojis.filter(({ semver }) => semver === 'patch').map(({ code }) => code),
        },
      }
    ]
  ]
}