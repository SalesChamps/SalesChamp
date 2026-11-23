# SalesChamp GitHub ↔ Jira integration

Jira project: `SCRUM` (My FYPTeam)  
GitHub repository: `SalesChamps/SalesChamp`

## 1. Connect GitHub development data to Jira

Install **GitHub for Atlassian** from Jira > Apps > Explore more apps. A Jira site administrator must install the app, and a GitHub organization owner must connect the `SalesChamps` organization. Grant access to the `SalesChamp` repository.

After connecting, branches, commits, pull requests, builds and deployments that contain Jira work-item keys can appear in the Jira Development panel. Team members must include the issue key in branch names, commit messages or PR titles.

Examples:

- Branch: `SCRUM-33-salesforce-adapter`
- Commit: `SCRUM-33 add Salesforce OAuth adapter`
- Pull request title: `SCRUM-33 Implement Salesforce adapter`

## 2. Add GitHub Actions secrets

In GitHub, open Settings > Secrets and variables > Actions > New repository secret. Add:

| Secret | Value |
|---|---|
| `JIRA_BASE_URL` | `https://umerhussain17june.atlassian.net` |
| `JIRA_EMAIL` | Email address of the Jira account used for automation |
| `JIRA_API_TOKEN` | Atlassian API token for that account |

Create the API token from the Atlassian account security settings. Never put the token in source code, workflow YAML, commits or issue comments.

## 3. What the CI workflow automates

The workflow at `.github/workflows/ci.yml` keeps the existing Django and Next.js checks and adds:

- Push to a non-main branch: when the branch name or commit message contains a `SCRUM-123` key, post the commit SHA/link to that Jira issue and attempt to move it to the In Progress status category.
- Merged pull request into `main`: after backend and frontend checks pass, post the PR/merge commit reference and attempt to move referenced Jira issues to the Done status category.
- Published GitHub Release: create a matching Jira project version (for example, `v1.0.0`) and assign any `SCRUM-123` keys in the release title/body to that fix version.

The automation does not close an issue on an ordinary push. It only marks work Done after a merged PR has passed the workflow checks.

## 4. Team conventions

1. Create one branch per Jira task and put its issue key first.
2. Include the issue key in every commit message.
3. Include the issue key in the pull request title.
4. Merge only after required checks pass and review is complete.
5. Publish a GitHub Release for each deliverable version and include the relevant Jira keys in its release notes.

## 5. Verify the integration

- Open a Jira task and inspect its Development panel after pushing a keyed branch.
- Open GitHub Actions and confirm the CI and Jira sync jobs complete.
- Merge a test PR referencing a test Jira issue and verify the issue status.
- Publish a test release only when ready; verify the matching Jira version appears under Project settings > Versions.

If the Development panel does not show commits after the app is connected, confirm the repository is selected in GitHub for Atlassian and that the Jira work-item key appears in the branch, commit message or PR title.
