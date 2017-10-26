import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { browserHistory } from "react-router"
import { Link } from "react-router"
import chromatism from "chromatism"

import ColorPickers from "../../components/color-pickers/container"
import { reset } from "../../actions/game"
import HeaderOne from "../../components/h1/h1"

import "./settings.scss"

class Settings extends Component {
  render() {
    const { style, } = this.props
    const reduceBrightness = amount => {
      return {
        color: style.color,
        backgroundColor: chromatism.brightness(amount, style.backgroundColor).hex,
      }
    }

    return (
      <section className="page settings">
        <HeaderOne>Settings</HeaderOne>
        <div className="row">
          <div className="col-xs-12">
            <div className="box" style={style}>
              <a tabIndex="0" onClick={browserHistory.goBack}>
                <i className="icon fa fa-arrow-left" />
                &nbsp; Go back
              </a>
            </div>
            <div className="box" style={reduceBrightness(4)}>
              <ColorPickers />
            </div>
            <div className="box" style={reduceBrightness(10)}>
              <a tabIndex="0" onClick={this.onReset}>
                <i className="icon fa fa-trash-o" />
                &nbsp;Reset game
              </a>
            </div>
            <div className="box" style={reduceBrightness(16)}>
              <Link tabIndex="0" to="name">
                Name your federation
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  onReset = () => {
    const { router, dispatch, } = this.props

    dispatch(reset())
    router.push("/default")
  }
}

Settings.contextTypes = {
  router: PropTypes.object.isRequired,
}

Settings.propTypes = {
  style: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  style: state.style,
}))(Settings)
