---
name: create-pull-request
description: 'Create a GitHub pull request with issue number in the title. Use when: opening a PR linked to a GitHub issue; need to format PR title as [ISSUE#] Feature Title; want to auto-populate PR description from commit messages. Supports extracting implementation details from recent commits on the current branch.'
argument-hint: 'Optional: provide GitHub issue number and/or feature title (e.g., "123 Add user authentication")'
user-invocable: true
---

# Create Pull Request

## When to Use

- Opening a PR for a tracked GitHub issue
- Need PR title formatted as `[ISSUE#] Feature Title`
- Want implementation details auto-extracted from commits
- Following team conventions for PR linking and documentation

## Workflow

### 1. Gather Issue Information

**Prompt User**: If GitHub issue number not provided in arguments:
```
GitHub Issue Number (without brackets, e.g., "123"):
```

**Input Format**: User provides issue ID → Stored as `[ISSUE_NUMBER]`

### 2. Collect Feature Title

**Prompt User**: If feature title not provided:
```
Feature/PR Title (e.g., "Add user authentication"):
```

**Input Format**: User enters descriptive title → Will be appended after issue bracket

### 3. Extract Implementation Details

**Retrieve commit messages** from current branch (not yet merged to main):
- Run: `git log --format="%B" origin/main..HEAD` (fetches commits on current branch)
- Parse commit messages to extract implementation details
- Format as bullet points for readability

**Sample Output**:
```
- Implemented JWT authentication flow
- Added password validation utility
- Created user login endpoint
- Added unit tests for auth module
```

### 4. Create Pull Request (Automated)

**Process**:
1. Verify GitHub CLI (`gh`) is installed and authenticated
2. Push current branch to remote (if not already pushed)
3. Build PR title: `[ISSUE_NUMBER] Feature Title`
4. Build PR description from commit messages and template
5. Execute: `gh pr create --title "[ISSUE_NUMBER] Feature Title" --body "<description>" --base main`

**PR Status**: Created as **ready-for-review** (not draft)

**PR Title Format**: `[ISSUE_NUMBER] Feature Title`

**Example**: `[123] Add user authentication`

**PR Description Template**:
```markdown
## Issue
Closes #ISSUE_NUMBER

## Implementation
- Implemented JWT authentication flow
- Added password validation utility
- Created user login endpoint
- Added unit tests for auth module
```

### 5. Add Summary Comment (Automated)

**Comment Template**:
```markdown
## What was implemented
[Extracted from commits and formatted]

## Files changed
[Auto-generated from git diff stats]

## PR ready for review
This PR links to issue #ISSUE_NUMBER and implements the planned changes.
```

Execute: `gh pr comment <PR_NUMBER> --body "<comment>"`

### 6. Confirmation

Display results:
- ✅ PR created successfully
- PR URL: `https://github.com/OWNER/REPO/pull/PR_NUMBER`
- Issue linked: `https://github.com/OWNER/REPO/issues/ISSUE_NUMBER` (auto-closes on merge)
- Status: Ready for Review

## Tips

- **Commit Message Quality**: Clear, descriptive commits yield better PR descriptions
- **Branch Sync**: Ensure your branch is synced before running this skill
- **Issue Linking**: PR will automatically link to and close the GitHub issue via `Closes #NNN`
- **Review Ready**: After creation, add reviewers and labels via GitHub UI if needed

## Prerequisites

- **GitHub CLI installed**: `gh --version` to verify
- **GitHub authentication**: `gh auth status` to verify logged-in state
- **Branch pushed to remote**: Current work must be pushed to origin before creating PR
- **GitHub issue exists**: Issue number must be valid on the repository

## Troubleshooting

| Issue | Solution |
|---|---|
| `gh` command not found | Install GitHub CLI: https://cli.github.com |
| Not authenticated to GitHub | Run `gh auth login` and follow prompts |
| Branch not yet pushed | Run `git push origin <branch-name>` first |
| Invalid issue number | Verify issue exists on repository |
| Commits not found | Ensure current branch has commits ahead of main |
| No commit messages parsed | Check commit messages are not empty |

## Example Usage

**Command**:
```
/create-pull-request 245 Add task filtering
```

**Execution Flow**:
1. Validates GitHub CLI is installed
2. Extracts commits from current branch
3. Creates PR: `[245] Add task filtering`
4. Adds summary comment with implementation details
5. Returns PR URL and status

**Result Output**:
```
✅ PR created successfully!
Title: [245] Add task filtering
URL: https://github.com/user/repo/pull/567
Issue linked: Closes #245
Status: Ready for Review
```
