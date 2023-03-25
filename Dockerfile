FROM node:18-alpine

# This is optional. Sets the level of logging that you see
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first, as they change less often than code.
COPY package.json package-lock.json* ./
COPY ./package/storybook-setup/package.json ./package/storybook-setup/
RUN npm ci && npm cache clean --force

# Copy entire workspace into container
COPY . .

# Make storybook port available available
EXPOSE 6006

# run storybook app
CMD ["npm", "run", "storybook"]
