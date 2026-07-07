---
name: pull-request-creation
description: 'Use when: creating a GitHub pull request, PR, merge request, or review request with the GitHub CLI (`gh`). Guides agents to inspect git state, summarize completed work, include a supplied ticket number, write a clear PR title/body, and run `gh pr create`.'
argument-hint: 'Optional: ticket number, base branch, draft/non-draft, PR title notes'
---

# Pull Request Creation

Create a pull request using the GitHub CLI with a clear summary of the completed task, validation performed, and ticket reference when supplied.

## When To Use

- The user asks to create, open, raise, or draft a pull request.
- The user mentions GitHub CLI, `gh pr create`, PR title, PR body, or review request.
- The user supplies a ticket number, issue key, story ID, or branch naming convention that should appear in the PR.

## Inputs To Capture

- Ticket number or issue key, if supplied by the user or evident from the branch name.
- Branch type when a new branch or branch rename is needed: `feature`, `bug`, or `chore`.
- Target base branch, if supplied. If not supplied, infer the repository default or ask only when inference is unsafe.
- Whether the PR should be draft or ready for review.
- Any user-specified title wording, reviewers, labels, assignees, or milestone.

## Branch Naming

Use the branch format `[feature/bug/chore]/<ticketnumber>/brief-description` for PR branches.

- Use `feature` for new user-facing capability or task work.
- Use `bug` for defect fixes.
- Use `chore` for maintenance, tooling, documentation, or non-product changes.
- Keep `<ticketnumber>` exactly as supplied or inferred, such as `TRAINING-1`.
- Keep `brief-description` lowercase, hyphen-separated, and concise.
- Example: `feature/TRAINING-1/task-entry-local-storage`.

## Procedure

1. Inspect repository state:
   - Run `git status --short --branch`.
   - Confirm the current branch is not the base branch.
   - Check whether there are uncommitted changes. Do not commit or discard changes unless the user explicitly asks.
2. Confirm GitHub CLI availability and authentication:
   - Run `gh --version` if availability is unknown.
   - Run `gh auth status` if authentication is uncertain.
   - If authentication needs a secret or browser login, ask the user to complete that directly.
3. Determine comparison context:
   - Identify the base branch from the user request, repository default, or likely workflow branch.
   - Use `git fetch` when needed to compare against remote branches.
   - Review changes with `git log --oneline <base>..HEAD` and `git diff --stat <base>...HEAD`.
4. Check branch naming:
   - Confirm the head branch follows `[feature/bug/chore]/<ticketnumber>/brief-description`.
   - If a ticket number was supplied or inferred and the branch does not match, rename or create the branch when the user has asked for branch updates or PR creation.
   - If the correct branch type is unclear, infer it from the work when safe; otherwise ask a concise clarifying question.
5. Extract the task-complete description:
   - Summarize what was completed at a high level, not every file edit.
   - Include the ticket number or issue key in the title and/or body when supplied.
   - Prefer a title format like `<ticket>: <concise completed outcome>` when a ticket exists, otherwise `<concise completed outcome>`.
6. Build the PR body:
   - Include `## Summary` with 2-4 bullets describing the completed work.
   - Include `## Validation` with commands/tests run, or `Not run` with a brief reason.
   - Include `## Ticket` when a ticket number was supplied or inferred.
   - Include notable risks, follow-ups, or manual checks only when relevant.
7. Create the PR with `gh pr create`:
   - Use `--base`, `--head`, `--title`, and `--body-file` for reliable quoting.
   - Add `--draft` when requested.
   - Add reviewers, labels, assignees, or milestone only when requested or standard for the repo.
8. Report the result:
   - Provide the PR URL returned by `gh pr create`.
   - Summarize title, base/head branches, and validation included in the body.

## Decision Points

- If there are uncommitted changes, stop before creating the PR and ask whether the user wants them committed, excluded, or left out.
- If the branch is not pushed, push it before PR creation only when the user has asked to create the PR and the remote target is clear.
- If the branch name does not follow `[feature/bug/chore]/<ticketnumber>/brief-description`, rename it before pushing when the ticket number and branch type are clear.
- If the ticket number is not supplied and cannot be inferred, create the PR without one rather than inventing a reference.
- If the base branch is ambiguous, ask a concise clarifying question before running `gh pr create`.
- If `gh pr create` reports an existing PR for the branch, return the existing PR URL and do not create a duplicate.

## PR Body Template

```markdown
## Summary
- Completed <high-level task outcome>.
- Updated <major behavior or workflow affected>.

## Validation
- <command or manual check performed>

## Ticket
- <ticket number or issue key>
```

Omit the `## Ticket` section when no ticket number was supplied or inferred.

## Completion Checks

- The PR exists on GitHub and the URL is reported to the user.
- The title clearly describes the completed task and includes the ticket number when supplied.
- The head branch follows `[feature/bug/chore]/<ticketnumber>/brief-description` when a ticket number is supplied or inferred.
- The body includes a high-level summary of the task completed and validation performed.
- No unrelated local changes were committed, discarded, or hidden.