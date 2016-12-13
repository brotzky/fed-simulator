export function getChampions(
  champions = [],
  collection = []
) {
  return collection.concat.apply([],
    champions.map(champion => champion.wrestlers)
  )
}

export function getChampionsIds(champions) {
  return champions.map(wrestler => wrestler.id)
}

export function getKeyedChampions(champions = []) {
  return champions.reduce((previous, champion) => (previous[champion.id] = champion, previous), {})
}
