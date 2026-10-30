# AGENTS.md

## Stack
- React + Vite for the front-end.
- JavaScript, JSX, CSS, and Vitest for unit/component tests.
- Cypress for end-to-end validation.

## Folder layout
- `src/App.jsx` holds app-level state and orchestration.
- `src/components/` contains one component per file.
- `src/utils/expenseUtils.js` contains pure logic such as validation and totals.
- `cypress/e2e/` stores end-to-end scenarios.

## Commands
- `npm install`
- `npm run dev`
- `npm run build`
- `npm test`
- `npm run test:run`
- `npm run coverage`
- `npm run cy:open`
- `npm run cy:run`

## Conventions
- Keep state in `App` and pass data down via props.
- One component per file.
- No new dependencies without approval.
- Work on a branch before major edits.
- Summarise the change in the PR description.
- Ask for a plan first and approve it before writing code.
- Reject any proposal that skips validation or introduces untestable behavior.
- Always validate with the smallest relevant test set before merging.
