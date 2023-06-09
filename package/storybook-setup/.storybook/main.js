import path from 'path';
import { mergeConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

const coverageConfig = {
  include: ['../src/**/*.jsx'],
  exclude: ['src/main.jsx'],
  extension: ['.jsx'],
  excludeNodeModules: true,
  all: true,
};
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-coverage',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config, options) {
    return mergeConfig(config, {
      // customize the Vite config here
      build: {
        sourcemap: true,
      },
      cacheDir: path.join(__dirname, './.vite-unique-cache'),
      plugins: [
        istanbul({
          ...coverageConfig
        }),
      ],
    });
  },
};
export default config;
