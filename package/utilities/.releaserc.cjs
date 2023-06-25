module.exports = {
  "branches": ["utilities", "main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    "@semantic-release/npm",
    [
      "semantic-release-gitmoji",
      {
        tagFormat: 'storydocker-utilities@v${version}',
        releaseRules: {
          major: [ ':boom:' ],
          minor: [  ],
          patch: [
            ':bug:',
            ':ambulance:',
            ':lock:'
          ],
          prepatch: [':sparkles:' ],
        },
        // releaseRules: {
        //   patch: {
        //     include: [':bento:', ':arrow_up:', ':lock:'],
        //   },
        //   patch: {
        //     include: [':sparkles:'],
        //   },
        // },
        // releaseNotes: {
        //   template: fs.readFileSync(tplFile, 'utf-8'),
        // }
      }
    ]
  ]
}