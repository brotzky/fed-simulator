import { connect } from "react-redux"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { Rubber } from "animate-components"
import { FadeInUp } from "animate-components"

class DashboardPage extends Component {
  render() {
    return (
      <section className="page dashboard">
        <FadeInUp>
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
