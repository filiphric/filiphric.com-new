export const punctuation = {
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
    inside: {
      'punctuation': /^["']|["']$/
    }
  },
  property: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
    inside: {
      'punctuation': /^["']|["']$/
    }
  },
  "string-property": {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
    inside: {
      'punctuation': /^["']|["']$/
    }
  }
}