import { findHighlights, combineHighlights, Highlight } from '../highlight'

describe('findHighlights', () => {
  it('should handle an empty text', () => {
    expect(findHighlights('', ['foo'])).toEqual([])
  })

  it('should find highlights of a passed text', () => {
    expect(findHighlights('foo-bar-baz', ['foo', 'bar'])).toEqual<Highlight[]>([
      { begin: 0, end: 3 },
      { begin: 4, end: 7 },
    ])
  })

  it('should find highlights that are overlapped with other words to search', () => {
    expect(findHighlights('foo-bar-baz', ['foo', 'oo'])).toEqual<Highlight[]>([
      { begin: 0, end: 3 },
      { begin: 1, end: 3 },
    ])
  })
})

describe('combineHighlights', () => {
  it('should combine highlights that are overlapped with other chunks', () => {
    expect(
      combineHighlights([
        { begin: 0, end: 3 },
        { begin: 1, end: 3 },
        { begin: 4, end: 7 },
      ]),
    ).toEqual<Highlight[]>([
      { begin: 0, end: 3 },
      { begin: 4, end: 7 },
    ])
  })

  it('should combine highlights that contains streaks of chunks', () => {
    expect(
      combineHighlights([
        { begin: 0, end: 3 },
        { begin: 3, end: 6 },
      ]),
    ).toEqual<Highlight[]>([{ begin: 0, end: 6 }])
  })
})
