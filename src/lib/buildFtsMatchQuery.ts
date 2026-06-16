/**
 * Build a SAFE FTS5 MATCH expression from raw user input.
 *
 * Strategy (prevents both FTS5 syntax errors and injection):
 *   - split on whitespace
 *   - strip FTS5 special characters from each term ("  *  :  -  (  )  ^  ~)
 *   - drop the FTS5 boolean/proximity operators (AND OR NOT NEAR)
 *   - discard empty terms
 *   - wrap each term in double quotes and append `*` → `"term"*`
 *       · quoting makes accented/unicode terms valid barewords (no syntax error)
 *       · the trailing `*` is a prefix match → covers Portuguese plurals/inflections,
 *         since there is no PT stemmer
 *   - join terms with spaces → implicit AND
 *
 * Returns null when nothing searchable remains (caller should return zero results rather
 * than run an empty MATCH, which is itself a syntax error).
 */
const FTS5_OPERATORS = new Set(['AND', 'OR', 'NOT', 'NEAR'])

export function buildFtsMatchQuery(raw: string): string | null {
  if (!raw) return null

  const terms = raw
    .split(/\s+/)
    .map((term) => term.replace(/["*:()^~-]/g, '').trim())
    .filter((term) => term.length > 0)
    .filter((term) => !FTS5_OPERATORS.has(term.toUpperCase()))
    .map((term) => `"${term}"*`)

  if (terms.length === 0) return null
  return terms.join(' ')
}
