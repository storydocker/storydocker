module.exports = {
	"ignorePackages": [
		"package/storybook-setup"
	],
	"deps": {
		"bump": "inherit"
	},
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    [
      "semantic-release-gitmoji"
    ]
  ]
}