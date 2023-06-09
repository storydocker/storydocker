import { gitmojis } from 'gitmojis';

/**
 * Generate release rules from gitmojis
 */
export const releaseRules = {
  major: gitmojis.filter(({ semver }) => semver === 'major').map(({ code }) => code),
  minor: gitmojis.filter(({ semver }) => semver === 'minor').map(({ code }) => code),
  patch: gitmojis.filter(({ semver }) => semver === 'patch').map(({ code }) => code),
};

export default {
  branches: [
    { name: 'main' },
    { name: 'next', channel: 'next', prerelease: true },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      "@semantic-release/github",
      {
        "successComment": false,
        "failComment": false
      }
    ],
    [
      "@semantic-release/git",
      {
        "message": "chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}"
      }
    ],
    '@semantic-release/npm',
    [
      'semantic-release-gitmoji',
      {
        tagFormat: 'storydocker-utilities@v${version}',
        releaseRules,
      }
    ]
  ]
}