import PropTypes from "prop-types"
import { compose, withHandlers, setPropTypes, withProps } from "recompose"
import { connect } from "react-redux"

import { updateWrestler } from "../../actions/roster"
import Wrestlers from "./wrestlers"

export const mappedPropTypes = {
  brandId: PropTypes.oneOfType([PropTypes.null, PropTypes.string]),
  collection: PropTypes.array,
  onDrop: PropTypes.func,
  onClick: PropTypes.func,
  canDrag: PropTypes.bool,
  withFilter: PropTypes.bool,
}

export const handlers = {
  onDrop: props => drop => {
    const brandId = props.brandId || null
    const id = drop.wrestler

    props.dispatch(updateWrestler({ brandId, id }))
  },
}

export const propsMapper = props => {
  let newRoster = Object.assign([], props.collection)

  if (props.brandId) {
    newRoster = newRoster.filter(item => item.brandId === props.brandId)
  }

  return {
    collection: newRoster,
  }
}

export const defaultStoreState = state => ({
  collection: state.roster,
})

export const enhance = compose(
  connect(defaultStoreState),
  withHandlers(handlers),
  setPropTypes(mappedPropTypes),
  withProps(propsMapper)
)

export default enhance(Wrestlers)
