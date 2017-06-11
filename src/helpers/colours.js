import chromatism from "chromatism"

export function luminance(hex, lum) {
  hex = String(hex).replace(/[^0-9a-f]/gi, "")
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  lum = lum || 0

  let rgb = "#", c, i

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
    rgb += ("00" + c).substr(c.length)
  }

  return rgb
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
