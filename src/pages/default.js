import { connect } from "react-redux"
import React, { Component } from "react"
import PropTypes from "prop-types"

class DefaultPage extends Component {
  componentWillMount() {
    const { game, router, roster, shows, style, } = this.props
    let pathName = "calendar"

    if (game.started === false || game.name === "") {
      pathName = "/name"
    } else if (game.size === "") {
      pathName = "/size"
    } else if (style.unTouched === "") {
      pathName = "/branding"
    } else if (roster.length === 0) {
      pathName = "/roster"
    } else if (shows.length === 0) {
      pathName = "/shows"
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
  style: state.style,
}))(DefaultPage)
