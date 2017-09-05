import React, { Component } from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import { Droppable } from "react-drag-and-drop"

export default class Team extends Component {
  static propTypes = {
    classes: PropTypes.string,
    teamId: PropTypes.string.isRequired,
    onDrop: PropTypes.func.isRequired,
    onRemoveWrestler: PropTypes.func.isRequired,
    onSelectWinner: PropTypes.func.isRequired,
    wrestlers: PropTypes.array.isRequired,
  }
  render() {
    const { classes, teamId, wrestlers, onSelectWinner, onRemoveWrestler, onDrop, } = this.props
    const hasWinner = wrestlers.find(wrestler => wrestler.winner)
    const hasManyWrestlers = wrestlers.length > 1
    const teamClasses = classnames(
      "team",
      "col-lg-6 col-sm-6 col-xs-12",
      {
        "has-winner": hasWinner,
      },
      {
        "has-many-wrestlers": hasManyWrestlers,
      },
      classes
    )

    return (
      <div data-teamId={teamId} className={teamClasses}>
        <Droppable types={["wrestler",]} onDrop={onDrop}>
          <div className="box dropzone">
            <Choose>
              <When condition={wrestlers.length > 0}>
                {wrestlers.map(wrestler => {
                  const key = `tw-${wrestler.id}`
                  const trophyClasses = classnames("icon fa fa-trophy", {
                    active: wrestler.winner,
                    inactive: wrestler.loser,
                  })
                  return (
                    <div className="wrestler" key={key} data-wrestlerId={wrestler.id}>
                      <span className="wrestler__name">
                        {wrestler.name}
                        <sup>
                          {wrestler.points}
                        </sup>
                      </span>
                      &nbsp;
                      <span className="wrestler__icons">
                        <i className={trophyClasses} title="Select the winner of the match" onClick={() => onSelectWinner(wrestler.id)} aria-hidden="true" />
                        &nbsp;
                        <i
                          className="icon fa fa-trash"
                          title="Remove this wrestler from this match"
                          onClick={() => onRemoveWrestler(wrestler.id)}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  )
                })}
              </When>
              <Otherwise>
                <i className="icon fa fa-info-circle" />&nbsp;Drop wrestlers here
              </Otherwise>
            </Choose>
          </div>
        </Droppable>
      </div>
    )
  }
}
