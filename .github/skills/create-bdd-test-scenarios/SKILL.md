---
name: create-bdd-test-scenarios
description: 'Create BDD test scenarios in Gherkin format. Use when: writing test requirements as Given/When/Then scenarios; designing tests for a feature; need to consider happy paths, edge cases, and negative scenarios; want to maintain test pyramid balance (80:15:5 unit:integration:E2E); building feature files for automated testing.'
argument-hint: 'Feature name and requirements'
user-invocable: true
---

# Create BDD Test Scenarios

Generate comprehensive BDD test scenarios in Gherkin format, organized by test level (unit/integration/E2E), saved directly to feature files with automatic deduplication and test pyramid validation.

## When to Use

- **Writing test requirements** as Given/When/Then specifications
- **Designing tests** for a new or existing feature
- **Building feature files** for automated testing (`.feature` files)
- **Need multiple test scenarios** covering happy paths, edge cases, and negative scenarios
- **Want guidance** on which scenarios are unit vs. integration vs. E2E
- **Maintaining test pyramid** balance across your test suite

## Procedure

### 1. Provide Requirements & Scope

Describe:
- **Feature name**: What feature are you testing? (e.g., "Add Task", "Filter Tasks", "Delete Task")
- **Feature requirements**: Functional and non-functional requirements
- **Context**: Any existing tests or constraints
- **Acceptance criteria**: How should the feature behave under different conditions?

### 2. Skill Interviews for Clarity

You'll be asked clarifying questions if needed:
- **Existing tests?** Should we check for duplication in existing `.feature` files?
- **Test scope?** Which scenarios are candidates for unit, integration, or E2E?
- **File organization?** Should scenarios go in a new `<feature-name>.feature` file or append to an existing one?

### 3. Scenario Generation

The skill generates scenarios covering:

#### Happy Paths (Primary)
- User successfully completes the main workflow
- All inputs are valid, system behaves as expected
- **Automation level**: Typically **Unit** (test isolated business logic)

#### Edge Cases
- Boundary conditions: empty inputs, max lengths, min values
- Off-by-one errors, null values, special characters
- Valid but unusual combinations
- **Automation level**: Mix of **Unit** (validation) and **Integration** (with dependencies)

#### Negative Scenarios
- Invalid inputs, constraint violations
- System under stress or degraded conditions
- Permission/authorization failures
- **Automation level**: Typically **Unit** (error handling) or **Integration** (with external services)

#### Happy Path Flows (Full Workflows)
- Multi-step user journeys spanning multiple features
- Cross-feature interactions and data dependencies
- **Automation level**: Exclusively **E2E** (browser/UI automation)
- **Storage**: Dedicated `E2E.feature` file to separate long-running tests

### 4. Test Level Assignment

Each scenario is assigned a level with reasoning:

| Level | Scope | Speed | Coverage |
|-------|-------|-------|----------|
| **Unit** | Single function/component in isolation; mocked dependencies | Fast (<100ms) | Single behavior |
| **Integration** | Multiple components working together; may hit real DB or APIs | Moderate (100ms-2s) | Integration points |
| **E2E** | Full user workflow through browser/UI | Slow (>2s) | Complete feature flow |

**Target pyramid**: ~80% Unit, ~15% Integration, ~5% E2E

You'll confirm the test level for each scenario before saving.

### 5. Deduplication Check

Before saving:
- Scan all `.feature` files in your project's `tests/` directory
- Check for semantically similar scenarios (same Given/When/Then structure)
- Flag duplicates and ask if you want to:
  - Skip duplicate
  - Merge with existing scenario
  - Keep both (different implementations or data)
- For **E2E** scenarios, extra scrutiny to avoid redundant full-workflow tests

### 6. File Organization & Generation

Scenarios are organized and saved:

**Unit/Integration scenarios** → `tests/<feature-name>.feature`
```gherkin
Feature: Add Task
  # Unit and Integration scenarios go here
  
  Scenario: User adds a task with valid text
    Given the task input is empty
    When the user enters "Buy groceries"
    And clicks "Add Task"
    Then the task "Buy groceries" is added to the list
    And the input field is cleared
```

**E2E scenarios** → `tests/E2E.feature`
```gherkin
Feature: End-to-End Task Management Workflows
  # All E2E scenarios go here
  
  Scenario: User creates task, filters, and completes it
    Given the task list is empty
    When the user adds a task "Complete project"
    And filters to show only active tasks
    And marks the task as done
    Then the completed task appears in the done filter
    And disappears from the active filter
```

### 7. Summary & Validation

After generation:
- **Scenario count**: Shows breakdown by level (Unit/Integration/E2E)
- **Pyramid check**: Confirms ratio aligns with 80:15:5 target; flags if skewed
- **Files created/updated**: Lists which `.feature` files were modified
- **Duplicates handled**: Reports any conflicts or skipped scenarios

---

## Scenario Template (Gherkin Syntax)

```gherkin
Feature: [Feature Name]
  As a [user role]
  I want to [capability]
  So that [business value]

  Scenario: [Clear, specific scenario title]
    Given [initial context/preconditions]
    When [user performs action]
    And [additional action if needed]
    Then [expected outcome/assertion]
    And [additional assertion if needed]
```

### Tips for Writing Scenarios

1. **Use concrete examples** instead of abstract placeholders:
   - ✅ `Given the user enters "Buy milk"`
   - ❌ `Given the user enters some text`

2. **One behavior per scenario**:
   - ❌ Multiple independent assertions in one scenario
   - ✅ Narrow, focused scenario that tests one thing

3. **Use `And` for readability**, not as a conjunction:
   - ✅ Multiple `Given`, `When`, or `Then` lines
   - ❌ Avoid nesting logic in a single line

4. **Test both success and failure**:
   - Happy path: User succeeds
   - Edge case: Boundary conditions
   - Negative: Invalid input or error state

---

## Test Level Decision Criteria

Use these criteria when deciding unit vs. integration vs. E2E:

### Unit Tests (~80% of pyramid)
- **Test what**: Single function, component, or business logic in isolation
- **Mocking**: All external dependencies (APIs, database, file system, localStorage)
- **Examples**:
  - Validating task input (no blanks)
  - Calculating priority level from urgency
  - Parsing date string to ISO format
- **Run in**: Node.js test runner (e.g., Jest, Vitest)

### Integration Tests (~15% of pyramid)
- **Test what**: Multiple components or units working together
- **Real dependencies**: May hit real database, file system, or internal APIs
- **Mocking**: External third-party APIs (OpenRouter, third-party services)
- **Examples**:
  - Add task → task persists to localStorage → task appears in UI list
  - Filter by done status → localStorage query works → filtered list renders
  - Save API key to options page → localStorage persists → API key available in popup
- **Run in**: Node.js with real storage layer, or browser test runner

### E2E Tests (~5% of pyramid)
- **Test what**: Complete user workflow end-to-end through the browser/UI
- **Scope**: Multiple screens/pages, cross-feature interactions
- **Mocking**: Minimal; prefer real application state
- **Examples**:
  - User opens page → adds 3 tasks → filters to active → marks one done → filters to done → sees only completed task
  - User enters API key in options → goes back to popup → submits task with priority → AI suggestion shows
- **Run in**: Browser automation (Playwright, Cypress)

---

## Deduplication Approach

Before saving scenarios, the skill:

1. **Scans all `.feature` files** in `tests/` directory
2. **Compares structure**: Checks if Given/When/Then blocks are semantically similar
3. **Identifies candidates**: Flags scenarios with same preconditions + action + outcome
4. **Asks for decision**:
   - Skip new scenario (keep existing)
   - Merge with existing (combine data or assertions)
   - Keep both (different implementation or data variation)
5. **For E2E**: Extra care to avoid overlapping full-workflow tests; prioritizes scenario breadth over similar coverage

---

## After Scenarios Are Saved

1. **Review the `.feature` file** in your editor
2. **Implement step definitions** (if using test automation framework)
3. **Run tests** to verify they pass:
   ```bash
   # Example: Gherkin/Cucumber runner
   npx cucumber-js tests/add-task.feature
   ```
4. **Track coverage**: Use test pyramid metrics to balance new tests with existing ones
5. **Update this skill** if you discover new patterns or test antipatterns

---

## Example Workflow

### Input
```
Feature: Add Task
Requirements:
- User can type a task name and click Add
- Input validation: no blank tasks
- Task persists to localStorage
- Input clears after adding
- UI shows new task in list immediately

Existing tests:
- Basic add functionality (unit)
```

### Output
Generated scenarios:
1. **Unit**: Happy path — add valid task, input clears
2. **Unit**: Edge case — whitespace-only input is rejected
3. **Unit**: Negative — empty input shows error
4. **Unit**: Edge case — very long task name (1000+ chars)
5. **Integration**: Task persists to localStorage after add
6. **E2E** (in E2E.feature): User adds task → filters active → completes task → checks done filter

### Files Modified
- Created: `tests/add-task.feature` (4 scenarios: unit + integration)
- Updated: `tests/E2E.feature` (added 1 E2E scenario)
- Pyramid check: 80% unit, 20% integration, 0% E2E (future: add 5% E2E tests)

---

## Common Questions

**Q: Should I write scenarios for every edge case?**
A: No. Write scenarios for *important* edge cases that could cause bugs (boundary values, invalid inputs). Skip trivial variations.

**Q: Can one scenario test multiple things?**
A: Prefer one scenario per behavior. Use `And` to add context or additional assertions within a single behavior, but not to test unrelated features.

**Q: Should E2E tests duplicate unit test coverage?**
A: No. E2E tests verify *integration* across features (e.g., add task → filter → complete). Unit tests verify *individual* behaviors (add, filter, complete separately).

**Q: What if my test pyramid is skewed?**
A: The skill will flag it. Focus on adding missing layers:
- Too many E2E? → Break into unit/integration scenarios
- Too many units? → Add integration scenarios to verify interactions
- Unbalanced? → Discuss with the skill; it may suggest refactoring

---

## Related Skills & Files

- **Test automation frameworks**: Cucumber/Gherkin, Jest, Playwright, Cypress
- **Test pyramid principles**: https://martinfowler.com/bliki/TestPyramid.html
- **BDD best practices**: https://cucumber.io/docs/guides/
