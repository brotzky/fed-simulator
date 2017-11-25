import PropTypes from "prop-types"
import { compose, setPropTypes, withProps } from "recompose"
import { connect } from "react-redux"
import sortBy from "lodash.sortby"

import Wrestlers from "./wrestlers"

export const mappedPropTypes = {
  brandId: PropTypes.oneOfType([PropTypes.null, PropTypes.string,]),
  collection: PropTypes.array,
  onClick: PropTypes.func,
  canDrag: PropTypes.bool,
  withFilter: PropTypes.bool,
}

export const propsMapper = props => {
  let newRoster = Object.assign([], props.collection)

  if (props.brandId) {
    newRoster = newRoster.filter(item => item.brandId === props.brandId)
  }

  newRoster = sortBy(newRoster, "points").reverse()

  return {
    collection: newRoster,
  }
}

export const defaultStoreState = state => ({
  collection: state.federation.roster,
})

export const enhance = compose(connect(defaultStoreState), setPropTypes(mappedPropTypes), withProps(propsMapper))

export default enhance(Wrestlers)
