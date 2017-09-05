import { compose, withState, withProps, withHandlers } from "recompose"
import { connect } from "react-redux"
import sortBy from "lodash/sortBy"
import { updateWrestler } from "../../actions/roster"

import Wrestlers from "./wrestlers"

export default compose(
  connect(state => ({
    roster: state.roster,
  })),
  withState("male", "toggleGender", true),
  withState("orderBy", "toggleOrderBy", false),
  withState("order", "toggleOrder", true),
  withHandlers({
    onDrop: props => drop => {
      props.dispatch(updateWrestler({ brandId: props.brandId, id: drop.wrestler, }))
    },
    toggleGender: ({ toggleGender, male, }) => () => toggleGender(!male),
    toggleOrderBy: ({ toggleOrderBy, orderBy, }) => () => toggleOrderBy(!orderBy),
    toggleOrder: ({ toggleOrder, order, }) => () => toggleOrder(!order),
  }),
  withProps(props => {
    const { roster, order, male, orderBy, brandId, } = props
    const orderByField = orderBy ? "name" : "points"

    let newRoster = Object.assign([], roster)

    newRoster = sortBy(newRoster, orderByField)
    newRoster = newRoster.filter(wrestler => wrestler.male === male)

    if (order) {
      newRoster = newRoster.reverse()
    }

    if (brandId) {
      newRoster = newRoster.filter(wrestler => wrestler.brandId === brandId)
    }

    return {
      ...props,
      roster: newRoster,
    }
  })
)(Wrestlers)
