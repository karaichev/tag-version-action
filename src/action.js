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
  
  console.log(tags);
}

run();
