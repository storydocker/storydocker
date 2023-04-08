# StoryDocker

Use StoryDocker to generate a Storybook environment in a docker container for an existing UI library.

Essentially, this is a micro-frontend for Storybook.

## Overview

This repo contains a base-layer setup of an npm module with one [NPM workspace](https://docs.npmjs.com/cli/v9/using-npm/workspaces?v=true) package. The package, found at ./package/storybook-setup, contains a generic UI component library with a Storybook implementation. Using docker, you can add your UI library to a docker image as a second `workspace`. You app will then inherit the Storybook dependencies allowing your library to use Storybook without adding any dependecies for Storybook to your app.

### What types of apps can use this?

So far, apps set up via `vite`'s [scaffolding api](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) (`npm create vite@latest`)

Known to work with:

* React 18
* Vue3
* Lit

This should work for both component libraries and full applications

### StoryDocker directory structure

```
📂 root
    📂 package
        📂 storybook-setup
            (generic app with a storybook implementation)
    📂 workspaces
        📂 application
            (contents of your app directory)
```

## Getting started

The [StoryDocker examples repo](https://github.com/storydocker/StoryDocker-examples) has example setups for React 18, Vue3, and Lit.

### Steps to get started in your repo

1. add a `Dockerfile` 
2. add a `docker-compose.yml` file
3. add a config directory for storybook
4. add 2 `npm scripts` to your `package.json`
5. add at least one storybook file
6. run `docker compose up`
7. profit

#### Step 1 - add a `Dockerfile`

See the [example Dockerfile](./Dockerfile.example)

The `Dockerfile` injects your local directory into the `workspaces/application` directory inside the docker image created via StoryDocker.

#### Step 2 - add a `docker-compose.yml` file

The `docker-compose` file will run the StoryDocker image with your app in a container. Saves you make locally will automatically sync the local file changes into the running container.

See [./docker-compose-example.yml](./docker-compose-example.yml)

#### Step 3 - add a config directory for storybook

1. At the root of your repo, add a `.storybook` directory
2. Add a `main` file at `.storybook/main.ts` (or `.storybook/main.js`)
   * typescript/web-components example at [./package/storybook-setup/.storybook/main.ts](./package/storybook-setup/.storybook/main.ts)
   * see various other examples in [the StoryDocker examples repo](https://github.com/StoryDocker/StoryDocker-examples)
3. Add a `preview` file at `.storybook/preview.ts` (or `.storybook/preview.js`)
   * typescript/web-components example at [./package/storybook-setup/.storybook/preview.ts](./package/storybook-setup/.storybook/preview.ts)
   * see various other examples in [the StoryDocker examples repo](https://github.com/StoryDocker/StoryDocker-examples)

#### Step 4 - add 2 `npm scripts` to your `package.json`

```
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

#### Step 5 - add at least one storybook file

* See some of Storybook's default-installed story files in [./package/storybook-setup/src/stories](./package/storybook-setup/src/stories)
* see various other examples in [the StoryDocker examples repo](https://github.com/StoryDocker/StoryDocker-examples)

#### Step 6 - run `docker compose up`

At the root of your project, where you added the files `Dockerfile` and `docker-compose.yml`, run

`docker compose up`

#### Step 7 - profit

Good luck!
