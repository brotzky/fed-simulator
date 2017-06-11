function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
export default function pointsToRandomValue(points) {
  let newPoints
  switch (points) {
    case "lowercard":
      newPoints = getRandomArbitrary(0, 40)
      break
    case "midcard":
      newPoints = getRandomArbitrary(40, 75)
      break
    case "mainevent":
      newPoints = getRandomArbitrary(75, 100)
      break
  }
  return newPoints
}
