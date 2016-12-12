export function groupWrestlersByChampionshipId(
  championships,
  collection = [],
) {
  // championships = championships.map(championship => {
  //     return {
  //       key: championship.id,
  //       ids: championship.wrestlers.map(wrestler => wrestler.id),
  //
  //   [championship.id] = championships[index].ids.map(champ => champ)
  // })
  collection = championships.reduce((newCollection, current) => {
    newCollection[current[0]] = current[1];
    return newCollection
  }, {})
  console.log(collection)
  return collection
}

export function groupWrestlersByChampionships(
  championships,
  collection = [],
) {
  collection = championships.map(championship => championship.wrestlers)
  return collection
}

export function groupByWrestlerIds(
  championships,
  collection = [],
) {
  championships = groupWrestlersByChampionships(championships)
  championships.forEach((championship) => {
    collection.push(championship)
  })
  return collection
}
