---
name: create-pr
description: "Create or raise a pull request when the user says create PR, raise PR, open PR, submit PR, or similar. Checks current git branch, creates and switches to a new branch if on main, stages changes, asks before committing, pushes branch, and opens a PR with GitHub CLI."
argument-hint: "Optional: PR title and description, or use defaults"
user-invocable: true
---

# Create Pull Request

## When to Use
- User asks to create PR, raise PR, open PR, submit PR, or make pull request.
- User wants branch safety before PR creation.
- User wants an end-to-end PR workflow from current workspace state.

## Required Tools
- Git repository is initialized and accessible.
- GitHub CLI `gh` is installed and authenticated.

## Procedure
1. Confirm repository status.
- Run `git rev-parse --is-inside-work-tree`.
- Run `git status --short --branch`.

2. Determine current branch.
- Run `git branch --show-current`.
- If branch name is `main`, create and switch to a feature branch.

3. Create branch only when on main.
- Branch naming default: `feature/<short-topic>`.
- Build `<short-topic>` from user prompt when possible, fallback to `pr-YYYYMMDD-HHmmss`.
- Run `git switch -c <new-branch>`.
- Re-check with `git branch --show-current`.

4. Ensure there is content to include.
- If no changed files and no staged files, stop and ask user what to include.
- If there are changes, stage with `git add -A` unless user asks for partial staging.

5. Create commit if needed.
- If there are staged changes, ask user before creating commit.
- Commit message default: `chore: prepare pull request`.
- If commit fails, report reason and ask user how to proceed.

6. Push branch.
- Run `git push -u origin <current-branch>`.

7. Create the pull request.
- Base branch default: `main`.
- If user gave title/body, use them.
- Otherwise use defaults:
  - Title: first line of last commit message.
  - Body: concise summary from `git log --oneline main..HEAD`.
- Run `gh pr create --base main --head <current-branch> --title "<title>" --body "<body>"`.

8. Return PR result.
- Provide PR URL, branch name, base branch, and commit summary.

## Decision Rules
- If current branch is not `main`, do not create a new branch unless user requests it.
- If remote `origin` is missing, stop and ask user to set remote.
- If `gh` is unavailable, stop and instruct user to install/authenticate GitHub CLI.
- Never use destructive git commands.

## Completion Checks
- A non-main branch is checked out when PR is created.
- Branch is pushed to remote.
- PR URL is successfully returned.
- User receives a concise summary of actions performed.
