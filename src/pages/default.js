import { connect } from "react-redux"
import React, { Component } from "react"
import PropTypes from "prop-types"

class Default extends Component {
  displayName = "Default"

  componentWillMount() {
    if (this.props.federation.name === "") {
      this.props.router.push("/name")
    } else if (this.props.federation.size === "") {
      this.props.router.push("/size")
    } else if (this.props.federation.backgroundColor === "") {
      this.props.router.push("/branding")
    } else if (this.props.roster.length === 0) {
      this.props.router.push("/roster")
    } else if (this.props.shows.length === 0) {
      this.props.router.push("/shows")
    } else if (this.props.calendar.length === 0) {
      this.props.router.push("/calendar")
    } else {
      this.props.router.push("/calendar")
    }
  }

  render() {
    const props = Object.keys(this.props)

    return (
      <section className="default">
        <h1>Default</h1>
        {props.map((name, key) => {
          return (
            <div key={key}>
              <h2>{name}</h2>
              {JSON.stringify(this.props[name])}
            </div>
          )
        })}
      </section>
    )
  }
}

Default.propTypes = {
  federation: PropTypes.object.isRequired,
  calendar: PropTypes.object.isRequired,
  shows: PropTypes.array.isRequired,
  roster: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  version: PropTypes.number.isRequired,
}

Default.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  federation: state.federation,
  calendar: state.calendar,
  shows: state.shows,
  roster: state.roster,
  settings: state.settings,
  version: state.version,
}))(Default)
