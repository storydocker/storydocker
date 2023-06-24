module.exports = {
  "branches": ["utilities", "main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    "@semantic-release/npm",
    [
      "semantic-release-gitmoji"
    ]
  ]
}