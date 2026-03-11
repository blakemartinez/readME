# readME — Claude Code Instructions

## Commit Workflow

Every commit to `main` follows this automated sequence:

### 1. Co-Authored-By Trailer
Always append this trailer to commit messages:
```
Co-Authored-By: Blake's CC Minion (claude-sonnet-4-6) <noreply@anthropic.com>
```
Use a HEREDOC to pass the message, e.g.:
```bash
git commit -m "$(cat <<'EOF'
Short description of change

Co-Authored-By: Blake's CC Minion (claude-sonnet-4-6) <noreply@anthropic.com>
EOF
)"
```

### 2. Pre-Commit Staff Engineer Review (REQUIRED before committing to main)
Before staging and committing any code changes, run a staff-level code review using the Agent tool:

```
subagent_type: general-purpose
prompt: |
  You are a staff software engineer doing a pre-commit code review.
  Review the following staged diff and all changed files for:
  - Bugs, logic errors, or edge cases
  - Security vulnerabilities (XSS, injection, etc.)
  - Performance issues
  - TypeScript type safety
  - Accessibility (a11y)
  - Any code that doesn't match the plan or introduces regressions

  Diff: [paste git diff output]
  Changed files: [list files]

  Return:
  1. LGTM if no issues found
  2. A list of specific issues with file:line references if found
  3. Suggested fixes for each issue
```

### 3. Apply Review Fixes
- If the review returns issues, fix all of them before committing.
- Re-run the review agent on the updated diff until it returns LGTM.
- Then commit with the Co-Authored-By trailer.

### 4. Automated Commit Checklist
Before every commit:
- [ ] Run staff engineer review agent
- [ ] Apply any fixes flagged by review
- [ ] Stage only relevant files (no `.env`, binaries, or secrets)
- [ ] Commit message: imperative tense, ≤72 chars subject line
- [ ] Co-Authored-By trailer included

---

## Project Overview
Vanilla HTML/CSS/JS reading list site. Being revamped to Next.js 14+ with App Router, Tailwind CSS, shadcn/ui, and TypeScript. See plan in conversation history for full spec.

## Stack (post-revamp)
- Next.js 14+ (App Router, `output: 'export'`)
- Tailwind CSS + shadcn/ui
- TypeScript
- Vercel static export deployment

## Key Paths
- `/app` — Next.js app router pages
- `/components` — React components
- `/lib/books.ts` — All book data (typed)
- `/lib/utils.ts` — Filtering/grouping utilities
- `/public/static/` — Book cover images
