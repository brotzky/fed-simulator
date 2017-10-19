import chromatism from "chromatism"

export const color = "#be0f09"
export const defaultColors = ["#000000", "#4A4A4A", "#9B9B9B", "#FFFFFF",]

const degrees = 10
const sections = 90
const list = chromatism.adjacent(degrees, sections, color).hex

export const colors = Array.from(new Set(Object.assign([], list, defaultColors)))
