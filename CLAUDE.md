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
Do an inline staff-level review of the staged diff before committing. Check:
- Bugs, logic errors, edge cases
- Security vulnerabilities (XSS, injection, etc.)
- TypeScript type safety
- Accessibility (alt text, keyboard nav, cursor targets)
- No regressions vs existing functionality

**When to spawn a subagent review instead of inline:**
Only use a `general-purpose` subagent review for diffs that are large (>200 lines changed) or touch security-sensitive code. For normal feature work, do the review inline to save tokens.

Subagent prompt when needed:
```
You are a staff software engineer. Review this git diff for bugs, type errors, security issues, and a11y problems.
Run: git diff --staged
Return: LGTM or a numbered list of file:line issues with fixes.
```

### 3. Apply Review Fixes
- Fix all flagged issues before committing.
- Only re-run the review if you made significant changes after the first pass.
- Then commit with the Co-Authored-By trailer.

### 4. Automated Commit Checklist
Before every commit:
- [ ] Run staff engineer review agent
- [ ] Apply any fixes flagged by review
- [ ] Stage only relevant files (no `.env`, binaries, or secrets)
- [ ] Commit message: imperative tense, ≤72 chars subject line
- [ ] Co-Authored-By trailer included

---

## Token Efficiency Rules (for multi-agent work)
- **Agents read files themselves** — don't paste file contents into agent prompts. Give file paths instead.
- **Scope briefs, not full implementations** — describe what to build, not every line of code.
- **Inline review by default** — only spawn a subagent review for diffs >200 lines or security-sensitive code.
- **Verify .gitignore before first commit** — especially after scaffolding tools (create-next-app, etc.).

## Project Overview
Next.js 16 App Router reading list site. Revamped from vanilla HTML/CSS/JS.

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
