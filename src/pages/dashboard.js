import { connect } from "react-redux"
import React, { Component } from "react"
import { FadeInUp } from "animate-components"

import HeaderOne from "../components/h1"
import { ANIMATION_SPEED } from "../constants/animation"

class DashboardPage extends Component {
  render() {
    const { animations, game, } = this.props

    return (
      <section className="page dashboard">
        <HeaderOne className="green">
          🤑 CEO Stuff
        </HeaderOne>
        <div className="row">
          <div className="col-xs-4">
            <div className="box">Large Cash count {game.cash}</div>
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
  animations: state.game.animations,
  game: state.game,
}))(DashboardPage)
