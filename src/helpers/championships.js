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

export function getKeyedWrestlers(wrestlers = []) {
  return wrestlers.reduce((previous, wrestler) => (previous[wrestler.id] = wrestler, previous), {})
}

export function getWrestlersWithChampionships(champions = []) {
  let wrestlers = getChampions(champions)
  let wrestlersById = getKeyedWrestlers(wrestlers)

  champions.forEach((championship) => {
    championship.wrestlers.forEach((wrestler) => {
      if (wrestlersById[wrestler.id]) {
        if (!wrestlersById[wrestler.id].championships) {
          wrestlersById[wrestler.id].championships = []
        }
        wrestlersById[wrestler.id].championships.push(championship)
      }
    })
  })
  return wrestlersById
}
