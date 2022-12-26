import colors from '@/constants/colors.json'
export const randomColor = () => {
  const color = colors[Math.floor(Math.random() * colors.length)].name
  return color
}
