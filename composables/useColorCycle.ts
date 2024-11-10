const colors = [
  'cheese',
  'blueberry',
  'lime',
  'tangerine',
  'mint',
  'punch'
] as const

export function useColorCycle(index: number) {
  const color = colors[index % colors.length]
  return `shadow-block-${color}`
} 