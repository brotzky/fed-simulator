import { connect } from "react-redux"
import React, { Component } from "react"
import PropTypes from "prop-types"

class DefaultPage extends Component {
  componentWillMount() {
    const { game, router, roster, shows, style, championships, } = this.props

    let pathName = "dashboard"

    if (game.started === false) {
      pathName = "/welcome"
    } else if (game.name === "") {
      pathName = "/name"
    } else if (game.size === "") {
      pathName = "/size"
    } else if (style.unTouched === true) {
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

export default connect(state => ({
  game: state.game,
  roster: state.roster,
  shows: state.shows,
  championships: state.championships,
  style: state.style,
}))(DefaultPage)
