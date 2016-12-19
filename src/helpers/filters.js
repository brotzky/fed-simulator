export const filterFemales = (wrestler, showFemalesOnly = false) => !showFemalesOnly || (showFemalesOnly && wrestler.male === false)
export const filterByBrand = (wrestler, brandName) => wrestler.brand === brandName
