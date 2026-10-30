# Prompt library

## New feature
Template:
```
Context:
- What problem are we solving?
- Where in the app does this belong?

Goal:
- What output should change?

Constraints:
- Keep state in App.
- One component per file.
- No new dependencies without approval.

Acceptance criteria:
- Each criterion must be testable.
- Every change must be covered by the smallest relevant test.

Examples:
- Add a valid expense and ensure the total updates.
- Reject invalid inputs and leave the list unchanged.
```

## Bug fix
Template:
```
Context:
- What is broken?
- Which user flow is failing?

Goal:
- Restore the expected behavior.

Constraints:
- Preserve existing functionality.
- Add or adjust a regression test.

Acceptance criteria:
- The bug is reproduced in a test.
- The fix makes the test pass.
```

## Refactor
Template:
```
Context:
- Which code needs cleanup?
- What behavior must remain identical?

Goal:
- Improve structure without changing outcomes.

Constraints:
- Keep behavior stable.
- Maintain existing tests.
```

## Generate tests
Template:
```
Context:
- Name the feature or function under test.
- Include the edge cases to cover.

Goal:
- Write failing tests first and confirm they catch the bug.

Constraints:
- Tests must be deterministic.
- Do not allow pass-by-default assertions.
```

## Review diff
Template:
```
Context:
- Summarise the changed files and the intent.

Goal:
- Verify the patch matches the request.

Constraints:
- Check for correctness, coverage, and regressions.
- Verify the app still runs.
```

## Commit message
Template:
```
feat: add expense form validation and total tracking

- Add input validation for required title, numeric amount, and value limits
- Track list totals and visible counts
- Add focused unit and component tests for new behavior
```

## Add expense feature prompt
```
Context:
The app is an expense tracker that must let a user enter a title, amount, and category. We need to add a form that creates entries and keeps the list and totals in sync.

Goal:
Add an expense with a title, amount and category and validate the input before it is stored.

Constraints:
- Keep state in App.
- Use one component per file.
- Do not add new dependencies.
- Reject empty titles, non-numeric numbers, zero or negative amounts, and amounts above 100000.
- Keep the running total and visible count updated.

Acceptance criteria:
- A valid expense is added to the list.
- The total updates to the sum of all expenses formatted to two decimal places.
- The visible count updates based on the current filter.
- An empty title is rejected.
- A non-numeric amount is rejected.
- A zero or negative amount is rejected.
- An amount over 100000 is rejected.
- The UI still works when a filter is applied.

Examples:
- Input: Title = Lunch, Amount = 250, Category = Food -> result: row added, total 250.00
- Input: Title =, Amount = 75, Category = Food -> result: validation error, row not added
- Input: Title = Rent, Amount = 100001, Category = Bills -> result: validation error, row not added
```
