import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import { Droppable } from "react-drag-and-drop"

import Wrestler from "../wrestler/wrestler"
import { Icon, Reset } from "../icons"

const NOOP = () => {}

const Team = ({ classes = "", teamId = "", wrestlers = [], onSelectWinner = NOOP, onRemoveWrestler = NOOP, onDrop = NOOP, }) => {
  const hasWinner = wrestlers.find(wrestler => wrestler.winner)
  const hasManyWrestlers = wrestlers.length > 2
  const teamClasses = classnames(
    "team",
    "col-xs-12",
    { "has-winner": hasWinner, },
    { "has-wrestlers": wrestlers.length > 0, },
    { "col-lg-6 col-sm-6 ": !hasManyWrestlers, },
    { "col-lg-12 col-sm-12 col-xs-12": hasManyWrestlers, },
    classes
  )
  return (
    <div className={teamClasses}>
      <Droppable types={["wrestler",]} onDrop={onDrop}>
        <div className="box dropzone">
          <Choose>
            <When condition={wrestlers.length > 0}>
              {wrestlers.map(wrestler => {
                const key = `tw-${wrestler.id}`
                const trophyClasses = classnames({
                  active: wrestler.winner,
                  inactive: wrestler.loser,
                })
                return (
                  <div tabIndex="0" className="member" key={key}>
                    <Wrestler wrestler={wrestler} />
                    &nbsp;
                    <span className="wrestler__icons">
                      <Icon icon="trophy" className={trophyClasses} title="Select the winner of the match" onClick={() => onSelectWinner(wrestler.id)} />
                      &nbsp;
                      <Reset title="Remove this wrestler from this match" onClick={() => onRemoveWrestler(wrestler.id)} />
                    </span>
                  </div>
                )
              })}
            </When>
            <Otherwise>
              <Icon icon="info-circle" />&nbsp;Drop wrestlers here
            </Otherwise>
          </Choose>
        </div>
      </Droppable>
    </div>
  )
}

Team.propTypes = {
  classes: PropTypes.string,
  teamId: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  onRemoveWrestler: PropTypes.func.isRequired,
  onSelectWinner: PropTypes.func.isRequired,
  wrestlers: PropTypes.array.isRequired,
}

export default Team
