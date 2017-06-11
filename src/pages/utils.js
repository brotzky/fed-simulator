import { connect } from "react-redux"
import React, { Component } from "react"

import utilsNavigation from "./utils.navigation.json"
import Navigation from "../components/navigation/navigation"

import "./stylesheets/utils"

class Utils extends Component {
  state = {
    stage: "start",
  }
  _onClearStorage = () => {
    this.setState({
      stage: "isComplete",
    })

    localStorage.clear()

    setTimeout(() => {
      this.setState({
        stage: "start",
      })
      location.reload()
    }, 3000)
  }

  render() {
    const { backgroundColor, color, } = this.props.federation

    const style = { backgroundColor, color, }
    return (
      <section className="page utils">
        <h1>
          Game Utils
        </h1>

        <Navigation style={style} navigation={utilsNavigation} />

        <br />

        <div className={this.state.stage}>
          <p>
            <a onClick={this._onClearStorage}>Clear game data</a>
          </p>
        </div>
        <br />
        <div className={this.state.stage}>
          <p>Shows: {this.props.shows.length}</p>
          <p>Roster: {this.props.roster.length}</p>
          <p>Championships: {this.props.championships.length}</p>
          <p>Live Shows: {this.props.calendar.length}</p>
          <p>Federation: {JSON.stringify(this.props.federation)}</p>
        </div>
      </section>
    )
  }
}

export default connect(state => ({
  calendar: state.calendar,
  championships: state.championships,
  federation: state.federation,
  roster: state.roster,
  settings: state.settings,
  shows: state.shows,
  version: state.version,
}))(Utils)
