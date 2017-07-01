import { connect } from "react-redux"
import React, { Component } from "react"

import HeaderOne from "../components/h1/h1"
import utilsNav from "./settings.navigation.json"
import Nav from "../components/nav/nav"

import "./stylesheets/settings.scss"

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
    const { style, } = this.props

    return (
      <section className="page settings">
        <HeaderOne>
          Settings
        </HeaderOne>
        <Nav style={style} navigation={utilsNav} />
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
            Game: <code>{JSON.stringify(this.props.game)}</code>
          </p>
        </div>
      </section>
    )
  }
}

export default connect(state => ({
  calendar: state.calendar,
  championships: state.championships,
  game: state.game,
  style: state.style,
  roster: state.roster,
  settings: state.settings,
  shows: state.shows,
  version: state.version,
}))(Settings)
