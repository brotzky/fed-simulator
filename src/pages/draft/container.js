import { connect } from "react-redux"
import { updateWrestler } from "../../actions/roster"
import { compose, withHandlers } from "recompose"

import Draft from "./draft"

export const handlers = {
  onDrop: props => (brandId, drop) => {
    const id = drop.wrestler

    props.dispatch(updateWrestler({ brandId, id, }))
  },
}

export const enhance = compose(
  connect(state => ({
    brands: state.federation.brands,
    style: state.style,
  })),
  withHandlers(handlers)
)

export default enhance(Draft)
