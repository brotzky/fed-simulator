import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import * as matchesAction from "../../actions/matches"
import Teams from "./teams"

import "./match.scss"

class MatchContainer extends Component {
  shouldComponentUpdate() {
    return true
  }

  render() {
    const { onAddWrestler, onSelectWinner, onRemoveWrestler, } = this
    const { teams, currentMatch, } = this.props

    return (
      <div className="match" data-matchId={currentMatch.id}>
        <Teams
          onAddWrestler={onAddWrestler}
          onSelectWinner={onSelectWinner}
          onRemoveWrestler={onRemoveWrestler}
          teams={teams}
        />
      </div>
    )
  }

  onAddWrestler = (teamId, wrestler) => {
    const wrestlerId = wrestler.id
    const { roster, dispatch, currentMatch, } = this.props

    wrestler = Object.assign(
      {},
      roster.find(wrestler => wrestler.id === wrestlerId),
      { teamId, }
    )

    dispatch(
      matchesAction.addWrestlerToMatch({
        matchId: currentMatch.id,
        wrestler,
      })
    )
  }

  onSelectWinner = wrestlerId => {
    this.props.dispatch(
      matchesAction.selectWinnerOfMatch({
        matchId: this.props.currentMatch.id,
        wrestlerId,
      })
    )
  }

  onRemoveWrestler = wrestlerId => {
    this.props.dispatch(
      matchesAction.removeWrestlerFromMatch({
        matchId: this.props.currentMatch.id,
        wrestlerId: wrestlerId,
      })
    )
  }

  onSimulateMatch = matchId => {
    if (this.props.simulateMatch) {
      this.props.simulateMatch({ matchId, })
    } else {
      this.props.dispatch(matchesAction.simulateMatch({ matchId, }))
    }
  }
}

MatchContainer.propTypes = {
  matches: PropTypes.array.isRequired,
  roster: PropTypes.array.isRequired,
  simulateMatch: PropTypes.func,
}

MatchContainer.displayName = "MatchContainer"

export default connect(state => ({
  matches: state.matches,
  roster: state.roster,
}))(MatchContainer)
