import config, { releaseRules } from 'storydocker-utilities/.releaserc.mjs';

const plugins = config.plugins.map(plugin => {
  if (Array.isArray(plugin) && plugin[0] === 'semantic-release-gitmoji') {
    return [
      'semantic-release-gitmoji',
      {
        tagFormat: 'storydocker-setup@v${version}',
        releaseRules,
      }
    ];
  }
  return plugin;
});


export default {
  ...config,
  plugins
};