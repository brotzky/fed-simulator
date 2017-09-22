import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import * as matchesAction from "../../actions/matches"
import Teams from "./teams"

class MatchContainer extends Component {
  render() {
    const { onAddWrestler, onSelectWinner, onRemoveWrestler, } = this
    const { teams, currentMatch, } = this.props

    return (
      <div className="match" data-matchId={currentMatch.id}>
        <Teams onDrop={onAddWrestler} onAddWrestler={onAddWrestler} onSelectWinner={onSelectWinner} onRemoveWrestler={onRemoveWrestler} teams={teams} />
      </div>
    )
  }

  onAddWrestler = (teamId, wrestler) => {
    const wrestlerId = wrestler.wrestler
    const { roster, dispatch, currentMatch, } = this.props

    wrestler = Object.assign({}, roster.find(wrestler => wrestler.id === wrestlerId), { teamId, })

    dispatch(
      matchesAction.addWrestlerToMatch({
        matchId: currentMatch.id,
        wrestler,
      })
    )
  }

  onSelectWinner = wrestlerId => {
    const { dispatch, currentMatch, } = this.props

    dispatch(
      matchesAction.selectWinnerOfMatch({
        matchId: currentMatch.id,
        wrestlerId,
      })
    )
  }

  onRemoveWrestler = wrestlerId => {
    const { dispatch, currentMatch, } = this.props

    dispatch(
      matchesAction.removeWrestlerFromMatch({
        matchId: currentMatch.id,
        wrestlerId: wrestlerId,
      })
    )
  }
}

MatchContainer.propTypes = {
  matches: PropTypes.array.isRequired,
  roster: PropTypes.array.isRequired,
  simulateMatch: PropTypes.func,
  teams: PropTypes.object,
  currentMatch: PropTypes.object,
  dispatch: PropTypes.func,
}

MatchContainer.displayName = "MatchContainer"

export default connect(state => ({
  matches: state.matches,
  roster: state.roster,
}))(MatchContainer)
