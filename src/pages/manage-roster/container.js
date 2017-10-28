import { compose, withProps, withStateHandlers } from "recompose"
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
  withStateHandlers(
    { id: false, creating: false, listView: false, },
    {
      onToggleCreating: ({ creating, }) => () => ({
        creating: !creating,
      }),
      onSetId: ({ id, }) => () => ({
        id: id,
      }),
      onToggleListView: ({ listView, }) => () => ({
        listView: !listView,
      }),
      onClick: () => id => ({
        creating: false,
        id,
      }),
    }
  ),
  connect(state => ({
    roster: state.roster,
    style: state.style,
  })),
  withProps(propsMapper)
)(ManageRoster)
