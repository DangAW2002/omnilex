# ADR 0002: Claude Code mod adapter

## Status

Prototype implemented and validated with Claude Code 2.1.296. Visual placement still needs a manual check in the user's terminal.

## Context

Termbridge needs two client-side lookup paths: explain terminology in an assistant reply and suggest terminology for a user's everyday description. The lookup should not consume model tokens.

## Decision

`packages/claude-mod` is a Claude Code mod loaded with `--plugin-dir`.

1. `tb build` bundles Vietnamese and English term lists, search entries, and layered explanations into the plugin's `data/` directory.
2. Assistant replies are drawn in one of three modes, switched with `/termbridge mode hover|links|badges` and kept in the plugin store:
   - `hover` (default): each prose line, heading or list item that holds a term is laid out by the mod with its own word wrap, so the term is a keyed box with an absolutely positioned summary card and a press target that opens the pane. Terms are drawn underlined in the theme's `suggestion` color. Code fences (closed or still streaming), tables, quotes and lines without terms stay in native `Markdown` blocks.
   - `links`: the whole reply is one native `Markdown` block; the first mention of each concept becomes a `file:` link to its `vi.md`, and a plain click in the fullscreen terminal opens the pane through `onLinkPress`.
   - `badges`: short plain replies get direct hover; other replies keep Claude Code's drawing with up to four badges below.
3. A short, expanded `UserMessage` containing a known plain description similarly makes the description a direct hover target. Other matching messages get a reverse lookup badge. The `/termbridge` command opens a pane where the user can enter any description, inspect candidate terms, and insert the selected label into the prompt. `/termbridge lang vi|en` selects the language of summaries, search, and explanations; the setting persists across sessions.
4. Homonyms and broadly ambiguous labels are excluded from automatic badges. The search pane still allows an explicit choice.

## Limits

- Claude Code's `Markdown` element has no per-word hover, and a `Text` nested in a `Text` cannot trigger a hover group, so `hover` mode re-implements word wrap and a subset of inline Markdown (bold, italic, inline code, links) for the lines it owns. Spacing and wrapping may differ slightly from the native renderer. Mod tests check the tree, not pixel placement or mouse behaviour in a live terminal.
- `ui.render` changes only the drawing: the stored message and the model stream are untouched.
- Reverse lookup uses the selected language's plain descriptions. Automatic term detection accepts Vietnamese and English terms in either language setting.
- Mod drawings run in the terminal and the Claude Desktop Code tab. VS Code's chat panel does not draw them.
- The plugin has local filesystem access through Claude Code's mods API. It makes no network or model calls for lookup.
