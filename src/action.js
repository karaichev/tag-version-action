const core = require('@actions/core')
const github = require('@actions/github');
const { context } = require('@actions/github/lib/utils');

async function run() {
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  const octokit = github.getOctokit(GITHUB_TOKEN);

  const tags = await octokit.rest.repos.listTags({
    ...github.context.owner,
    ...github.context.repo,
  });

  let result = '';

  if (tags.data) {
    result = tags.data[0].name || ''
    console.log(result);

    core.setOutput('version', result)
  }
}

run();
