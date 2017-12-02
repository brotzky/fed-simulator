import { connect } from "react-redux"
import { updateWrestler } from "../../actions/roster"
import { compose, withHandlers } from "recompose"

import { generateRoster } from "../../actions/roster"
import Draft from "./draft"

export const handlers = {
  onDrop: props => (brandId, drop) => {
    const id = drop.wrestler

    props.dispatch(updateWrestler({ brandId, id, }))
  },
  onGenerate: props => () => props.dispatch(generateRoster()),
}

export const enhance = compose(
  connect(state => ({
    brands: state.federation.brands,
    style: state.style,
  })),
  withHandlers(handlers)
)

export default enhance(Draft)
