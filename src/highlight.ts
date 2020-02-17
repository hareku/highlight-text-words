export interface Highlight {
  begin: number
  end: number
}

/**
 * Find highlights from a passed text.
 */
export function findHighlights(
  textToHighlight: string,
  searchWords: string[],
): Highlight[] {
  return searchWords
    .filter(searchWord => searchWord) // Remove empty words
    .reduce((highlights, searchWord) => {
      const regex = new RegExp(escapeRegExpFn(searchWord), 'gi')

      let match: RegExpExecArray | null
      while ((match = regex.exec(textToHighlight))) {
        const begin = match.index
        const end = regex.lastIndex

        if (end > begin) {
          highlights.push({ begin, end })
        }

        // Prevent browsers like Firefox from getting stuck in an infinite loop
        // See http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/
        if (match.index === regex.lastIndex) {
          regex.lastIndex++
        }
      }

      return highlights
    }, [] as Highlight[])
}

function escapeRegExpFn(string: string): string {
  return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/**
 * Combine highlights for overlapped string indices.
 */
export function combineHighlights(highlights: Highlight[]): Highlight[] {
  return highlights
    .sort((first, second) => first.begin - second.begin)
    .reduce((processedHighlights, highlight) => {
      if (processedHighlights.length === 0) {
        return [highlight]
      }

      const prevHighlight = processedHighlights[processedHighlights.length - 1]
      if (highlight.begin <= prevHighlight.end) {
        // current is overlapped with prev
        processedHighlights.pop()

        const endIndex = Math.max(prevHighlight.end, highlight.end)
        processedHighlights.push({
          begin: prevHighlight.begin,
          end: endIndex,
        })
      } else {
        processedHighlights.push(highlight)
      }

      return processedHighlights
    }, [] as Highlight[])
}
