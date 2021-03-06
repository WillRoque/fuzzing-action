const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const path = require("path");
const html = require("./html.js")

async function main() {
  const covDir = core.getInput("coverage_dir");
  const githubToken = core.getInput("github_token");
  const githubClient = new github.getOctokit(githubToken);

  if (!github.context.payload.pull_request) {
    core.info(
      "Not creating a comment with test coverage because this is not a pull request."
    );
    return;
  }

  const covDataArr = readCoverageFiles(covDir);
  const rendered = html.renderTables(covDataArr);

  await githubClient.issues.createComment({
    repo: github.context.repo.repo,
    owner: github.context.repo.owner,
    issue_number: github.context.payload.pull_request.number,
    body: rendered,
  });
}

function readCoverageFiles(covDir) {
  let covDataArr = [];
  console.log("covDir", covDir)
  fs.readdirSync(covDir).forEach((file) => {
    console.log("file", file)
    const absPath = path.join(covDir, file);
    console.log("absPath", absPath)
    const rawData = fs.readFileSync(absPath);
    console.log("rawData", rawData)
    covDataArr.push(JSON.parse(rawData));
  });
  console.log("covDataArr", covDataArr)
  return covDataArr;
}

main().catch((err) => core.setFailed(err.message));
