import colors from '@/constants/colors.json'

let colorIndex = 0

export const randomColor = (seed?: string): string => {
  if (seed) {
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return colors[Math.abs(hash) % colors.length].name
  } else {
    // Use a deterministic approach when no seed is provided
    const color = colors[colorIndex % colors.length].name
    colorIndex++
    return color
  }
}