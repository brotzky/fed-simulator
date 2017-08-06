import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import HeaderOne from "../components/h1/h1"
import links from "./settings.navigation.json"
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
      this.props.router.push("/default")
    }, 3000)
  }

  render() {
    const { stage, } = this.state
    const { style, shows, roster, game, calendar, championships, } = this.props

    return (
      <section className="page settings">
        <HeaderOne>Settings</HeaderOne>
        <Nav style={style} links={links} />
        <br />
        <div className={stage}>
          <p>
            <a onClick={this._onClearStorage}>Clear game data</a>
          </p>
        </div>
        <br />
        <div className={stage}>
          <p>
            Shows: {shows.length}
          </p>
          <p>
            Roster: {roster.length}
          </p>
          <p>
            Championships: {championships.length}
          </p>
          <p>
            Live Shows: {calendar.length}
          </p>
          <p>
            Game: <code>{JSON.stringify(game)}</code>
          </p>
        </div>
      </section>
    )
  }
}

Settings.contextTypes = {
  router: PropTypes.object.isRequired,
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
