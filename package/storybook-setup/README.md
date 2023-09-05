# The StoryDocker default Storybook setup

This package contains the default Storybook setup for StoryDocker, which can also be used as a standalone Storybook setup for your project.

## Storybook Dependencies

The Storybook dependencies are added as `dependencies` instead of the typical `devDependencies`. If you install this package, NPM will also install the Storybook dependencies for your project. 

This is a multi-framework setup, but the JS framework dependencies are installed as `devDependencies` - so those will not conflict with your project deps. 

## StoryDocker CLI

Currently a WIP, the StoryDocker CLI is used for things like auto-generating Storybook config files and boilerplate stories into `./src`. To see the current commands, run `npx storyD --help`.

## Shared tests

This package includes tests for the Storybook boilerplate stories. These Storybook interaction tests can be imported by your project to test the auto-installed-by-storybook-cli boilerplate stories.

See to article series [Sharing tests across UI components](https://dev.to/scottnath/series/22727) on dev.to for details.
