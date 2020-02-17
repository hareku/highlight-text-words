import { Highlight, findHighlights, combineHighlights } from './highlight'

export interface Chunk {
  isHighlighted: boolean
  begin: number
  end: number
}

/**
 * Highlight a text.
 */
export function highlightText(
  textToHighlight: string,
  searchWords: string[],
): Chunk[] {
  return fillInChunks({
    chunksToHighlights: combineHighlights(
      findHighlights(textToHighlight, searchWords),
    ),
    textLength: textToHighlight.length,
  })
}

function fillInChunks({
  chunksToHighlights,
  textLength,
}: {
  chunksToHighlights: Highlight[]
  textLength: number
}): Chunk[] {
  const allChunks: Chunk[] = []
  const append = (begin: number, end: number, isHighlighted: boolean): void => {
    if (end - begin > 0) {
      allChunks.push({
        begin,
        end,
        isHighlighted,
      })
    }
  }

  if (chunksToHighlights.length === 0) {
    append(0, textLength, false)
  } else {
    let lastIndex = 0
    chunksToHighlights.forEach(chunk => {
      append(lastIndex, chunk.begin, false)
      append(chunk.begin, chunk.end, true)
      lastIndex = chunk.end
    })
    append(lastIndex, textLength, false)
  }
  return allChunks
}
