const core = require('@actions/core')
const github = require('@actions/github');
const { context } = require('@actions/github/lib/utils');
const regExpGroupNum = 1;

async function run() {
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  const REGEXP = core.getInput('REGEXP');
  const octokit = github.getOctokit(GITHUB_TOKEN);

  const tags = await octokit.rest.repos.listTags({
    ...github.context.owner,
    ...github.context.repo,
  });

  let result = '';

  if (tags.data) {
    const tagName = tags.data[0].name || ''

    if (REGEXP) {
      const regExp = new RegExp(REGEXP);
      const regExpResult = regExp.exec(tagName);

      if (regExpResult && regExpResult.length > regExpGroupNum) {
        result = regExpResult[regExpGroupNum];
      } else {
        result = tagName;
      }
    }

    core.setOutput('version', result);
  }

  return '';
}

run();
