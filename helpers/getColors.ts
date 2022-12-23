import { default as colors } from '@/constants/colors.json'
let getColors: any = {}
colors.forEach(({ color, name }) => {
  getColors[name] = color
})

export { getColors }