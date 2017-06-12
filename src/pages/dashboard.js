import { connect } from "react-redux"
import React, { Component } from "react"
import { FadeInUp } from "animate-components"

import { ANIMATION_SPEED } from "../constants/animation"

class DashboardPage extends Component {
  render() {
    return (
      <section className="page dashboard">
        <FadeInUp duration={ANIMATION_SPEED}>
          <h1 className="green">
            🤑 CEO Stuff
          </h1>
        </FadeInUp>
        <div className="row">
          <div className="col-xs-4">
            <div className="box">Large Cash count</div>
          </div>
          <div className="col-xs-4">
            <div className="box">expensive</div>
          </div>
          <div className="col-xs-4">
            <div className="box">cheap</div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            Liveshows table
          </div>
        </div>
      </section>
    )
  }
}

DashboardPage.displayName = "DashboardPage"

export default connect(state => ({
  federation: state.federation,
  game: state.game,
}))(DashboardPage)
