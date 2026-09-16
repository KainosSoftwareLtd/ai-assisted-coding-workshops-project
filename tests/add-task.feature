Feature: Task 1 - Core Task Entry
  As a user
  I want to add tasks to my list
  So that I can manage my tasks

  Background:
    Given the page is loaded
    And the task list is empty
    And localStorage is cleared

  # ── Basic Functionality ──────────────────────────────────────────

  @Integration
  Scenario: Add task via button click
    When I type "Buy groceries" in the input field
    And I click the Add button
    Then the task "Buy groceries" should appear in the list
    And the input field should be empty
    And the input field should be focused

  @Integration
  Scenario: Add task via Enter key
    When I type "Finish project" in the input field
    And I press Enter
    Then the task "Finish project" should appear in the list
    And the input field should be empty
    And the input field should be focused

  @Integration
  Scenario: Sequential task entry
    When I add the following tasks in order:
      | task             |
      | First task       |
      | Second task      |
      | Third task       |
    Then all 3 tasks should appear in the list in correct order
    And each task should have a unique ID

  # ── Input Validation ────────────────────────────────────────────

  @Unit
  Scenario: Empty input rejection
    When I click the Add button with empty input
    Then no task should be created
    And the list should remain empty
    And the empty state should be visible

  @Unit
  Scenario: Whitespace-only input rejection
    When I type "     " in the input field
    And I click the Add button
    Then no task should be created
    And the list should remain empty

  @Unit
  Scenario: Task with leading and trailing whitespace is trimmed
    When I type "   Clean house   " in the input field
    And I click the Add button
    Then the task "Clean house" should appear in the list
    And the stored task text should be "Clean house" (no leading/trailing spaces)

  @Unit
  Scenario: Maximum length task (200 characters)
    When I type a 200-character task
    And I click the Add button
    Then the task should be added successfully
    And the full task text should be stored in localStorage

  @Integration
  Scenario: Special characters in task
    When I add the following tasks:
      | task                           |
      | Fix 🐛 in sidebar              |
      | Update API (@v2.0)             |
      | Add "new feature"              |
      | Task with $pecial ch@rs!       |
    Then all tasks should render correctly
    And no HTML should be broken
    And all special characters should be preserved

  # ── Persistence (Critical) ──────────────────────────────────────

  @Integration
  Scenario: Tasks persist after page refresh
    When I add the following tasks:
      | task          |
      | Task 1        |
      | Task 2        |
      | Task 3        |
    And I refresh the page
    Then all 3 tasks should still be in the list
    And the tasks should be in the same order

  @E2E
  Scenario: Tasks persist after tab close and reopen
    When I add the following tasks:
      | task          |
      | Persistent 1  |
      | Persistent 2  |
    And I close the tab
    And I reopen index.html in the browser
    Then both tasks should still be visible
    And the data should be restored from localStorage

  @Integration
  Scenario: localStorage contains valid task data
    When I add the task "Test task"
    Then localStorage key "kainos-todo:todos" should exist
    And the localStorage value should be valid JSON
    And the JSON should contain an array with 1 task object
    And each task object should have properties:
      | property  | type      |
      | id        | number    |
      | text      | string    |
      | done      | boolean   |
      | createdAt | string    |
      | priority  | null      |

  @Integration
  Scenario: Corrupted localStorage does not crash the app
    Given localStorage contains corrupted JSON
    When the page is loaded
    Then the app should not crash
    And the empty state should be displayed
    And a console error should be logged for debugging

  # ── UI/UX ───────────────────────────────────────────────────────

  @Integration
  Scenario: Input field clears after successful submission
    When I type "Test task" in the input field
    And I click the Add button
    Then the input field should be empty
    And the input field should be focused
    And I should be able to type the next task immediately

  @Integration
  Scenario: Empty state displays when no tasks exist
    Given the task list is empty
    When the page is loaded
    Then the empty state with "All clear!" message should be visible
    And the icon should display "✓"
    And the description should say "Add a task above to get started."

  @Integration
  Scenario: Empty state disappears when first task is added
    Given the empty state is visible
    When I add the task "First task"
    Then the empty state should disappear
    And the task should be displayed in the list

  # ── Edge Cases ───────────────────────────────────────────────────

  @Unit
  Scenario: Unique ID generation for tasks
    When I add two tasks within milliseconds:
      | task   |
      | Task A |
      | Task B |
    Then Task A should have a different ID than Task B
    And both IDs should be numeric timestamps

  @Integration
  Scenario: Very long task names are stored and handled correctly
    When I add a 150+ character task
    Then the task should be stored in full length
    And the task should display without breaking the layout
    And the full text should be accessible in localStorage

  @Integration
  Scenario: Rapid-fire task additions
    When I rapidly add 5 tasks in quick succession
    Then all 5 tasks should be created
    And no duplicate tasks should exist
    And the app should not crash or hang

  @Unit
  Scenario: createdAt timestamp is set correctly
    When I add the task "Timestamped task"
    Then the task should have a createdAt property
    And the createdAt should be an ISO 8601 formatted string
    And the createdAt should be close to the current time (within 1 second)

  # ── Browser Compatibility ───────────────────────────────────────

  @Integration
  Scenario: localStorage API is used for persistence
    When I add a task
    Then localStorage.getItem('kainos-todo:todos') should return a valid JSON string
    And localStorage.setItem should have been called to persist the data

  @Integration
  Scenario: Render function is called after state change
    When I add a task
    Then the DOM should be updated to reflect the new state
    And the new task should be visible in the #todo-list element
    And renderList() should have been invoked
    And renderEmptyState() should have been invoked
    And renderStats() should have been invoked
