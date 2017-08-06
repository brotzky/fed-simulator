import React from "react"
import { compose } from "recompose"
import { connect } from "react-redux"
import { withRouter } from "react-router"

import WelcomePage from "./welcome"
import { generateFederation } from "../../actions/game"

export default compose(
  withRouter,
  connect(null, dispatch => ({
    generateFederation: props => {
      console.log(props)
      return dispatch(generateFederation())
    },
  }))
)(WelcomePage)
