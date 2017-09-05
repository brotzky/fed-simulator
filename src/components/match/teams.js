import React from "react"

import Team from "./team"

import "./match.scss"

const noop = () => {}

const Teams = ({ onAddWrestler = noop, onRemoveWrestler = noop, onSelectWinner = noop, teams = [], }) => {
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
