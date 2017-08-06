import React from "react"
import { compose, lifecycle } from "recompose"
import { connect } from "react-redux"
import { withRouter } from "react-router"

import WelcomePage from "./welcome"
import { generateFederation } from "../../actions/game"

export default compose(
  connect(
    state => ({
      started: state.game.started,
    }),
    dispatch => ({
      generateFederation: () => dispatch(generateFederation()),
    })
  ),
  withRouter,
  lifecycle({
    componentWillReceiveProps(props) {
      if (props.started) {
        props.router.push("/dashboard")
      }
    },
  })
)(WelcomePage)
