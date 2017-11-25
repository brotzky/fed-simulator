import { connect } from "react-redux"
import { Component } from "react"
import PropTypes from "prop-types"

class DefaultPage extends Component {
  componentWillMount() {
    const { championships, name, router, started, untouched, } = this.props

    let pathName = "dashboard"

    if (started === false) {
      pathName = "/welcome"
    } else if (name === "") {
      pathName = "/name"
    } else if (untouched === true) {
      pathName = "/branding"
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
  untouched: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  started: state.game.started,
  name: state.game.name,
  untouched: state.style.untouched,
}))(DefaultPage)
