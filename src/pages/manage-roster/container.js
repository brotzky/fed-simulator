import { compose, withState, withProps, withHandlers } from "recompose"
import { connect } from "react-redux"

import ManageRoster from "./manage-roster"

const propsMapper = props => {
  const currentWrestler = props.id ? props.roster.find(wrestler => wrestler.id === props.id) : null

  return {
    currentWrestler,
    ...props,
  }
}

export default compose(
  withState("id", "setId", false),
  withState("addingWrestler", "setAdd", false),
  withHandlers({
    onClick: ({ setId, setAdd, }) => wrestlerId => {
      setAdd(false)
      setId(wrestlerId)
    },
    openAddWrestler: ({ setAdd, addingWrestler, setId, }) => () => {
      setAdd(!addingWrestler)
      setId(null)
    },
  }),
  connect(state => ({
    roster: state.roster,
    style: state.style,
  })),
  withProps(propsMapper)
)(ManageRoster)
