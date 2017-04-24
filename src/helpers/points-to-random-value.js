function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
export default function pointsToRandomValue(points) {
  let newPoints
  switch (points) {
    case 'jobbers':
      newPoints = getRandomArbitrary(0, 30)
      break
    case 'lowercard':
      newPoints = getRandomArbitrary(30, 60)
      break
    case 'midcard':
      newPoints = getRandomArbitrary(60, 80)
      break
    case 'mainevent':
      newPoints = getRandomArbitrary(80, 100)
      break
    case 'commentators':
      newPoints = getRandomArbitrary(0, 5)
      break
  }
  return newPoints
}
