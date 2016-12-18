export function getPercentageAmount(total, percentage) {
  return total * (percentage / 100)
}

// http://stackoverflow.com/a/24152886/275218
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
