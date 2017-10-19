import { compose, withProps, lifecycle, withState } from "recompose"
import { connect } from "react-redux"
import { withRouter } from "react-router"

import { getId } from "../../models/model.helper"
import CreateAMatch from "./create-a-match"
import buttonTexts from "../../constants/create-a-match-button-texts"
import { createMatch, simulateMatch, addWrestlerToMatch } from "../../actions/matches"

export const pick = items => items[Math.floor(Math.random() * (items.length - 1))]

export const lifecycleMapper = lifecycle({
  componentWillMount() {
    let id
    if (!this.props.location.query.id) {
      id = getId()
      this.props.onCreate({ id, })
    } else {
      id = this.props.location.query.id
    }

    this.props.setId(id)
  },

  componentWillUpdate(nextProps) {
    const currentMatch = nextProps.matches.find(item => item.id === nextProps.id)

    if (currentMatch && currentMatch.id && !this.props.location.query.id) {
      this.props.router.push(`/create-a-match?id=${currentMatch.id}`)
    }
  },
})

export default compose(
  withRouter,
  withState("id", "setId", null),
  connect(
    state => ({
      roster: state.roster,
      matches: state.matches,
      style: state.style,
    }),
    dispatch => ({
      onCreate: currentMatch => dispatch(createMatch(currentMatch)),
      onSimulateMatch: id => dispatch(simulateMatch(id)),
      onWrestlerClick: props => dispatch(addWrestlerToMatch(props)),
    })
  ),
  withProps(props => {
    const currentMatch = props.matches.find(item => item.id === props.id)

    let newProps = {
      buttonText: String(pick(buttonTexts)),
      currentMatch,
      onWrestlerClick: wrestlerId => {
        return props.onWrestlerClick({
          matchId: currentMatch.id,
          wrestler: Object.assign(props.roster.find(item => item.id === wrestlerId), { teamId: getId(), }),
        })
      },
      onReset: () => {
        const id = getId()

        props.setId(id)
        props.onCreate({ id, })
        props.router.push(`/create-a-match?id=${id}`)
      },
      onSimulateMatch: () => props.onSimulateMatch(currentMatch.id),
      winner: currentMatch && currentMatch.wrestlers.find(item => item.winner),
      loser: currentMatch && currentMatch.wrestlers.find(item => item.loser),
    }
    return { ...props, ...newProps, }
  }),
  lifecycleMapper
)(CreateAMatch)
