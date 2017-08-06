import React from "react"
import { compose } from "recompose"
import { connect } from "react-redux"

import WelcomePage from "./welcome"
import { generateFederation } from "../../actions/game"

export default compose(
  connect(null, dispatch => ({
    generateFederation: () => dispatch(generateFederation()),
  }))
)(WelcomePage)
