import { compose } from "recompose"
import { connect } from "react-redux"

import Draft from "./draft"

export default compose(
  connect(state => ({
    brands: state.brands,
    style: state.style,
  }))
)(Draft)
