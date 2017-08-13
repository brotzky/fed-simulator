import chromatism from "chromatism"

export const sprectrum = chromatism.adjacent(10, 90, "#cdb403").hex
export const defaultColors = ["#000000", "#4A4A4A", "#9B9B9B", "#FFFFFF",]
export const colors = Object.assign([], sprectrum, defaultColors)
