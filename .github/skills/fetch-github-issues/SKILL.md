---
name: fetch-github-issues
description: 'Fetch GitHub issues from your current project using gh CLI. Use when: retrieving project issues programmatically; filtering by state (open, closed, all); filtering by labels; viewing issue details and metadata; integrating issue data into development workflows.'
argument-hint: 'Issue filter criteria (state, labels, or leave blank for all open issues)'
user-invocable: true
---

# Fetch GitHub Issues

Retrieve issues from the current GitHub repository using the `gh` CLI tool with filtering options (state, labels). Automate issue discovery and integrate issue data into your development workflow.

## When to Use

- **Retrieving project issues** programmatically from current repo
- **Filtering by state**: Open, closed, or all issues
- **Filtering by labels**: Find issues tagged with specific labels
- **View issue metadata**: Titles, descriptions, authors, creation dates
- **Integrate with development workflow**: Get issue context for feature branches or PRs
- **Automated issue discovery**: Build workflows that depend on issue data

## Prerequisites

1. **`gh` CLI installed**: Run `gh --version` to verify
   - Install from https://cli.github.com/ if needed
2. **GitHub authentication**: Run `gh auth status` to confirm login
   - Authenticate with `gh auth login` if required
3. **Repository context**: Must be run from within the project directory
   - `gh issue list` reads the current repo from `.git` config

## Procedure

### 1. Verify Prerequisites

Before fetching issues, confirm:
- [ ] `gh` CLI is installed and working (`gh --version`)
- [ ] GitHub authentication is active (`gh auth status` shows "Logged in")
- [ ] Current working directory is the repository root (contains `.git/`)

### 2. Choose Filter Criteria

Decide what issues to fetch. Select one or more:

| Filter | Syntax | Examples |
|--------|--------|----------|
| **State** | `--state <state>` | `open`, `closed`, `all` (default: `open`) |
| **Labels** | `--label <label>` | `bug`, `feature`, `enhancement`, `in-progress` |
| **Limit** | `--limit <number>` | `10`, `50`, `100` (default: 30) |
| **Output format** | `--json` | JSON for parsing; omit for human-readable table |

**Decision Tree:**
```
Do you want:
├─ All open issues?          → --state open (or omit, default)
├─ Closed issues?            → --state closed
├─ Specific label(s)?        → --label "label-name"
├─ Multiple conditions?      → Combine: --state open --label bug
└─ Machine-readable output?  → Append --json
```

### 3. Execute the Fetch Command

Run the `gh` command with selected filters:

#### Example: Fetch all open issues
```bash
gh issue list --state open
```

#### Example: Fetch issues with "bug" label
```bash
gh issue list --label bug --state open
```

#### Example: Fetch closed issues (JSON format for parsing)
```bash
gh issue list --state closed --json number,title,state,labels
```

#### Example: Fetch all issues with limit
```bash
gh issue list --state all --limit 50
```

### 4. Parse & Interpret Results

**Human-readable table output** (default):
```
Showing 5 of 8 open issues in ai-assisted-coding-workshops-project-jakub-gdanks

#   TITLE                               STATE   LABELS
1   Add task priority feature            OPEN    enhancement
2   Fix localStorage persistence bug     OPEN    bug
3   Implement AI suggestions             OPEN    feature
```

**JSON output** (with `--json` flag):
```json
[
  {
    "number": 1,
    "title": "Add task priority feature",
    "state": "OPEN",
    "labels": [{"name": "enhancement"}]
  }
]
```

### 5. Filter & Act on Results

Based on the output:
- **Use in PR**: Reference issue number in PR title `[ISSUE#X] Feature Title`
- **Create branch**: `git checkout -b issue-X-feature-name`
- **Export to task list**: Copy issue titles/descriptions to your task manager
- **Further filtering**: Pipe output through `grep`, `awk`, or JSON parsers

## Common Patterns

### Get all open issues for current sprint
```bash
gh issue list --label sprint-current --state open --limit 20
```

### Export issues to file for review
```bash
gh issue list --state open --json number,title,state,labels > issues.json
```

### Find issues assigned to you
```bash
gh issue list --state open --assignee @me
```

### Monitor blocked issues
```bash
gh issue list --label blocked --state open
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `gh: command not found` | Install `gh` CLI from https://cli.github.com/ |
| `not authorized to access repo` | Run `gh auth login` and authenticate with GitHub |
| `fatal: not a git repository` | Ensure you're in the project root directory (contains `.git/`) |
| No results returned | Verify filter criteria; try `--state all` to check all issues |
| JSON parsing errors | Ensure `--json` fields are valid; check `gh issue list --help` for available fields |

## Quality Criteria

- ✅ Command executed without authentication errors
- ✅ Results match filter criteria (state, labels)
- ✅ Output is readable or valid JSON
- ✅ Issue count is accurate (compare to web UI)
- ✅ Issue metadata (title, author, date) is complete

## Next Steps

- Create a branch from an issue: `gh issue develop <issue-number>`
- Create a PR linked to an issue: `gh pr create --draft --issue <issue-number>`
- Close an issue from PR: Reference `Closes #X` in PR description
- Combine with task list: Extract issue data and create task entries

## See Also

- [`create-pull-request`](../) — Link PRs to issues with `[ISSUE#] Title` format
- [`gh` CLI documentation](https://cli.github.com/manual/) — Full command reference
