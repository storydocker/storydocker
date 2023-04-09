FROM ghcr.io/storydocker/storydocker:main

# Destination directory inside the container - one level, do not use subdirectories
ARG WORKSPACE_DIR=application

# Localhost port for Storybook
ARG STORYBOOK_PORT=6006

# Internal-to-docker variable for Storybook port
ENV SB_PORT=$STORYBOOK_PORT

# This is optional. Sets the level of logging that you see
ENV NPM_CONFIG_LOGLEVEL warn

# Install dependencies first, as they change less often than code.
COPY package.json ./workspaces/${WORKSPACE_DIR}/
RUN npm i && npm cache clean --force

# Copy entire workspace into container
COPY . ./workspaces/${WORKSPACE_DIR}/

# Make storybook port available externally
EXPOSE $STORYBOOK_PORT

# run storybook app
CMD ["npm", "run", "storybook", "-workspace", "workspaces/${WORKSPACE_DIR}/"]
