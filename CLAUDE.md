# Neha Sehgal — Portfolio

The full project guide — how to make edits, the stack, structure, design tokens,
and current TODOs — is shared with every coding agent in one place:

@AGENTS.md

Read that file first; it's the single source of truth. Everything below is only
for working in Claude Code specifically.

## Claude Code notes

- **TL;DR:** almost all changes are content, and content lives in one typed file:
  `src/data/projects.ts` (the `site` object for bio/links, the `projects` array
  for work). See AGENTS.md for the details.
- This site is built to be edited conversationally — describe the change ("update
  my bio", "add a project", "write the Awfis case study") and make it directly.
- When you change how the project *works* (not just content), update `AGENTS.md`
  so Codex and other agents stay in sync — don't duplicate that guidance here.
