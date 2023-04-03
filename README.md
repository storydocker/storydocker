# storydocker

Use storydocker to generate a Storybook environment in a docker container for an existing UI library.

## What is this?

Base setup of an npm module with one workspace package that contains a generic UI component library with a Storybook setup

## storydocker basic setup steps

1. generate React w/Vite app with npm create vite@latest
1. add a Dockerfile with FROM ghcr.io/storydocker/storydocker:main (see Dockerfile below)
1. add two npm scripts to package.json
    ```
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
    ```
1. add a .storybook directory config


### `Dockerfile`

Put this in a Dockerfile at the root of your project.

```
FROM ghcr.io/storydocker/storydocker:main

ARG WORKSPACE_DIR=package/react-vite/

# This is optional. Sets the level of logging that you see
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first, as they change less often than code.
COPY package.json ./${WORKSPACE_DIR}
RUN npm i && npm cache clean --force

# Copy entire workspace into container
COPY . ./${WORKSPACE_DIR}

# Make storybook port available available
EXPOSE 6006

# run storybook app
CMD ["npm", "run", "storybook", "-workspace", ${WORKSPACE_DIR}]
```

### docker-compose.yml

```
services:
  client:
    container_name: storydocker_client
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 6006:6006
    volumes:
      - .:/usr/src/app/package/react-vite
    command: npm run storybook
    
```