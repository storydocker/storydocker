import { outputFile } from 'fs-extra';
import { gitmojis } from 'gitmojis'

export const getTemplateCodes = () => {
  let codes = '';
  gitmojis.forEach(gitmoji => {
    codes += `
{{#if ${gitmoji.name}}}
## ${gitmoji.emoji} ${gitmoji.description}
{{#each ${gitmoji.name}}}
- {{> commitTemplate}}
{{/each}}
{{/if}}
`;
  });

  return codes;
};

/**
 * Generate a template file for semantic-release-gitmoji
 * @todo move `BOOM` to top of list
 * @todo generally make list match the releaseRules
 */
export const generateTemplateFile = async () => {
  const filename = `all-gitmoji.hbs`;
  let fileContents = `
{{#if compareUrl}}
# [v{{nextRelease.version}}]({{compareUrl}}) ({{datetime "UTC:yyyy-mm-dd"}})
{{else}}
# v{{nextRelease.version}} ({{datetime "UTC:yyyy-mm-dd"}})
{{/if}}
`;
  fileContents += getTemplateCodes();
  try {
    await outputFile(`./${filename}`, fileContents);
  } catch (err) {
    console.error(err)
  }
}

generateTemplateFile();