import { connect } from "react-redux"
import React, { Component } from "react"
import PropTypes from "prop-types"

class DefaultPage extends Component {
  componentWillMount() {
    const {
      size,
      name,
      router,
      roster,
      shows,
      started,
      unTouched,
      championships,
    } = this.props

    let pathName = "dashboard"

    if (started === false) {
      pathName = "/welcome"
    } else if (name === "") {
      pathName = "/name"
    } else if (size === "") {
      pathName = "/size"
    } else if (unTouched === true) {
      pathName = "/branding"
    } else if (roster.length === 0) {
      pathName = "/roster"
    } else if (shows.length === 0) {
      pathName = "/shows"
    } else if (championships.length === 0) {
      pathName = "/championships"
    }

    router.push(pathName)
  }

  render() {
    return null
  }
}

DefaultPage.displayName = "DefaultPage"

DefaultPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

DefaultPage.propTypes = {
  started: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  unTouched: PropTypes.bool.isRequired,
  roster: PropTypes.array.isRequired,
  championships: PropTypes.array.isRequired,
  shows: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  started: state.game.started,
  name: state.game.name,
  size: state.game.size,
  unTouched: state.style.unTouched,
  roster: state.roster,
  championships: state.championships,
  shows: state.shows,
}))(DefaultPage)
