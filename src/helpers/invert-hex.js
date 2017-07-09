//http://stackoverflow.com/a/9601429/275218

export default function invertHex(hexTripletColor) {
  let color = hexTripletColor.substring(1)
  color = parseInt(color, 16)
  color = 0xffffff ^ color
  color = color.toString(16)
  color = ("000000" + color).slice(-6)
  return `#${color}`
}
