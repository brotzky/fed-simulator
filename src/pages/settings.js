import { connect } from "react-redux"
import React, { Component } from "react"

import HeaderOne from "../components/h1"
import utilsNavigation from "./settings.navigation.json"
import Navigation from "../components/navigation/navigation"

import "./stylesheets/settings"

class Settings extends Component {
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
      <section className="page settings">
        <HeaderOne>
          Settings
        </HeaderOne>
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
          <p>
            Federation: <code>{JSON.stringify(this.props.federation)}</code>
          </p>
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
}))(Settings)
