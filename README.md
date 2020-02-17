# highlight-text-words

You can highlight words of texts on JavaScript.
This lib is supporting TypeScript.

## Install

`yarn add highlight-text-words` or `npm install highlight-text-words`.

## Usage

### API

```ts
function highlightText(textToHighlight: string, searchWords: string[]): Chunk[]

export interface Chunk {
  isHighlighted: boolean
  begin: number
  end: number
}
```

### Result

```ts
import { highlightText } from 'highlight-text-words`

const chunks = highlightText('foo-bar-baz', ['bar'])
console.log(chunks)
/**
  {
    begin: 0,
    end: 4,
    isHighlighted: false
  },
  {
    begin: 4,
    end: 7,
    isHighlighted: true
  },
  {
    begin: 7,
    end: 11,
    isHighlighted: false
  }
 */
```

### Example

```ts
import { highlightText } from 'highlight-text-words`
import escape from 'escape-html'

const chunks = highlightText('foo-bar-baz', ['bar'])
const rawHtml = chunks
  .map(chunk => {
    const { start, end, isHighlighted } = chunk
    const text = props.text.substr(start, end - start)
    if (isHighlighted) {
      return `<span class="primary">${escape(text)}</span>` // You had better escape texts when highlight user generated contents.
    } else {
      return escape(text)
    }
  })
  .join('')

console.log(rawHtml)
// foo-<span class="primary">bar</span>-baz
```
