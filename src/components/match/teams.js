import React from "react"

import Team from "./team"
import * as itemType from "../../actions/types"

const noop = () => {}

const Teams = ({
  accepts = [itemType.WRESTLER,],
  onAddWrestler = noop,
  onRemoveWrestler = noop,
  onSelectWinner = noop,
  teams = [],
}) => {
  const amountOfTeams = Object.keys(teams).length - 1
  return (
    <div className="teams row">
      {Object.keys(teams).map((teamId, key) => {
        const wrestlers = teams[teamId]
        const classes = key > 1 && amountOfTeams === key ? "last" : ""
        return (
          <Team
            classes={classes}
            onDrop={item => onAddWrestler(teamId, item)}
            accepts={accepts}
            key={`t-${teamId}-${key}`}
            teamId={teamId}
            onRemoveWrestler={onRemoveWrestler}
            onSelectWinner={onSelectWinner}
            wrestlers={wrestlers}
          />
        )
      })}
    </div>
  )
}

export default Teams
