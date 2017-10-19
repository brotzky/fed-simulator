import chromatism from "chromatism"

export function luminance(hex, lum) {
  hex = String(hex).replace(/[^0-9a-f]/gi, "")
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  lum = lum || 0

  let rgb = "#",
    c,
    i

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
    rgb += ("00" + c).substr(c.length)
  }

  return rgb
}

export const shade = (color, percent) => {
  // deprecated. See below.
  const num = parseInt(color.slice(1), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt
  return (
    "#" +
    (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255))
      .toString(16)
      .slice(1)
  )
}

export function getShadeBySize(baseColour, size) {
  let stylePercent
  switch (size) {
    case "xs":
      stylePercent = 0
      break
    case "sm":
      stylePercent = 20
      break
    case "md":
      stylePercent = 40
      break
    case "lg":
      stylePercent = 60
      break
  }
  return chromatism.hue(stylePercent, baseColour).hex
}

export function getContrastRatioColor(color) {
  return chromatism.contrastRatio(color).hex
}
