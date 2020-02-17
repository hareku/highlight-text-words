import { highlightText, Chunk } from '../parse'

describe('highlightText', () => {
  test('basic usage', () => {
    expect(highlightText('foo-bar-baz', ['bar'])).toEqual<Chunk[]>([
      {
        begin: 0,
        end: 4,
        isHighlighted: false,
      },
      {
        begin: 4,
        end: 7,
        isHighlighted: true,
      },
      {
        begin: 7,
        end: 11,
        isHighlighted: false,
      },
    ])
  })
})
