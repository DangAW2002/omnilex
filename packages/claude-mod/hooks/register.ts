import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { TermEntry, ClaudeRenderContext } from '../types/index.d.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let termsCache: TermEntry[] | null = null;

function loadTerms(): TermEntry[] {
  if (termsCache) return termsCache;
  const termsFile = path.resolve(__dirname, '../data/terms.json');
  if (fs.existsSync(termsFile)) {
    try {
      termsCache = JSON.parse(fs.readFileSync(termsFile, 'utf-8'));
      return termsCache || [];
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Scan AssistantMessage markdown text and inject interactive terminology links.
 * Excludes code blocks, inline code, and existing URLs.
 */
export function renderAssistantMessage(props: { text: string }, context: ClaudeRenderContext) {
  const terms = loadTerms();
  if (!terms || terms.length === 0) {
    return props;
  }

  let text = props.text;
  for (const term of terms) {
    if (!term.autolink) continue;
    const regex = term.match === 'exact-case' 
      ? new RegExp(`\\b${term.key}\\b`, 'g')
      : new RegExp(`\\b${term.key}\\b`, 'gi');

    text = text.replace(regex, (match) => {
      return `[${match}](termbridge://${term.concepts[0]?.id || ''})`;
    });
  }

  return {
    ...props,
    text,
    onLinkPress: (url: string) => {
      if (url.startsWith('termbridge://')) {
        const conceptId = url.replace('termbridge://', '');
        const entry = terms.find((t) => t.concepts.some((c) => c.id === conceptId));
        if (entry && context.ui?.open) {
          context.ui.open({
            title: `Termbridge: ${entry.concepts[0]?.label}`,
            concepts: entry.concepts
          });
        }
      }
    }
  };
}
