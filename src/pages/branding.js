import { connect } from "react-redux"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { CirclePicker } from "react-color"
import Helmet from "react-helmet"

import { updateStyle } from "../actions/style"
import { colors } from "../constants/colors"

import "./stylesheets/branding.scss"

const noop = () => {}
const EVENT_STUB = { preventDefault: noop, }

class BrandingPage extends Component {
  componentWillMount() {
    this.setState(this.props.style)
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const style = this.props.style
    return (
      <section className="page branding">
        <Helmet title="Branding" />
        <h1 className="col-xs-12 skew-forward" style={style}>
          🏳️ What colours represent you {this.props.name}? 🏳️
        </h1>
        <div className="row colours">
          <div className="col-xs-6 col-lg-6 center-xs middle-xs">
            <div className="box">
              <h5>BG</h5>
              <CirclePicker
                width="auto"
                colors={colors}
                onChange={this.onChangeBGColor}
              />
            </div>
          </div>
          <div className="col-xs-6 col-lg-6 center-xs middle-xs right">
            <div className="box">
              <h5>Text</h5>
              <CirclePicker
                width="auto"
                colors={colors}
                onChange={this.onChangeColor}
              />
            </div>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <button style={style} type="submit" onClick={this.onHandleSubmit}>
            Paint Save and build your dream roster
          </button>
        </form>
      </section>
    )
  }

  onHandleSubmit = (event = EVENT_STUB) => {
    event.preventDefault()

    this.props.router.push("/default")
  }

  onChangeColor = color => {
    const newState = Object.assign({}, this.props.style, {
      color: color.hex,
    })

    this.props.dispatch(updateStyle(newState))
  }

  onChangeBGColor = backgroundColor => {
    const newState = Object.assign({}, this.props.style, {
      backgroundColor: backgroundColor.hex,
    })

    this.props.dispatch(updateStyle(newState))
  }
}

BrandingPage.displayName = "BrandingPage"

BrandingPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

BrandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  name: state.game.name,
  style: state.style,
}))(BrandingPage)
