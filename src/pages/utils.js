import { connect } from "react-redux"
import React, { Component } from "react"
import { Link } from "react-router"
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
    return (
      <section className="page utils">
        <h1>
          Game Utils
        </h1>
        <div className={this.state.stage}>
          <p>
            <Link to="/">
              <div className="fa fa-arrow-left" /> Go back
            </Link>
          </p>
          <p>
            <a onClick={this._onClearStorage}>Clear game data</a>
          </p>
        </div>
        <br />
        <div className={this.state.stage}>
          <p>Shows: {this.props.shows.length}</p>
          <p>Roster: {this.props.roster.length}</p>
          <p>Live Shows: {this.props.calendar.collection.length}</p>
          <p>Federation: {JSON.stringify(this.props.federation)}</p>
        </div>
      </section>
    )
  }
}

export default connect(state => ({
  federation: state.federation,
  calendar: state.calendar,
  shows: state.shows,
  roster: state.roster,
  settings: state.settings,
  version: state.version,
}))(Utils)
