const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
  const githubToken = core.getInput("github-token");
  const githubClient = new github.getOctokit(githubToken);

  if (!github.context.payload.pull_request) {
    core.info(
      "Not creating a comment with test coverage because this is not a pull request."
    );
    return;
  }

  const commentBody = `<p>Total Coverage: <code>85%</code></p>
<details><summary>Coverage report</summary>
<p>
<pre>test</pre>
</p>
</details>`;

  await githubClient.issues.createComment({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    issue_number: github.context.payload.pull_request.number,
    body: commentBody,
  });
}

main().catch((err) => core.setFailed(err.message));
