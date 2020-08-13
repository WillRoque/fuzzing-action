import core from "@actions/core"
import { GitHub, context } from "@actions/github"

const main = async () => {
    const githubToken = core.getInput("github-token");
    const githubClient = new GitHub(githubToken);

    if (!context.payload.pull_request) {
        core.info("Not creating a comment with test coverage because this is not a pull request.")
        return;
    }

    const commentBody = `<p>Total Coverage: <code>85%</code></p>
<details><summary>Coverage report</summary>
<p>
<pre>test</pre>
</p>
</details>`;

    await githubClient.issues.createComment({
        repo: context.repo.repo,
        owner: context.repo.owner,
        issue_number: context.payload.pull_request.number,
        body: commentBody,
    });
};

main().catch(err => core.setFailed(err.message));