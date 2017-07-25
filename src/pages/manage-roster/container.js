import { connect } from "react-redux"
import { compose, withState, withHandlers } from "recompose"

import ManageRoster from "./manage-roster"

const mapStateToProps = connect(state => ({
  roster: state.roster,
}))

export default compose(
  mapStateToProps,
  withState("isVisible", "toggleVis", false),
  withHandlers({
    onEscape: ({ toggleVis, }) => {
      return () => {
        return toggleVis(false)
      }
    },
    toggleVisibility: ({ toggleVis, isVisible, }) => {
      return () => {
        return toggleVis(!isVisible)
      }
    },
  })
)(ManageRoster)
