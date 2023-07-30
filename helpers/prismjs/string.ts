export const string = {
  operator: {
    pattern: /:/,
    greedy: true,
    inside: {
      punctuation: /:/
    }
  },
  'arrow-operator': {
    pattern: /=>/,
    greedy: true,
    inside: {
      operator: /=>/
    }
  },
  'equals-operator': {
    pattern: /===/,
    greedy: true,
    inside: {
      operator: /===/
    }
  },
  'pipe-operator': {
    pattern: /\|/,
    greedy: true,
    inside: {
      operator: /\|/
    }
  },
  param: {
    pattern: /(?<=\(\s*(?:(?:\w+\s*,\s*)*))(?:\w+|(?:\{[\w\s,]+\}))(?=\s*(?:=>|\)|,))/,
    inside: {
      variable: /\b\w+\b/,
      punctuation: /[,{}]/
    },
    greedy: true
  }
}
