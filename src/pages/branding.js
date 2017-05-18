import "./stylesheets/branding.scss"
import { connect } from "react-redux"
import { updateFederation } from "../actions/federation"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { SwatchesPicker } from "react-color"

const noop = () => {}
const EVENT_STUB = { preventDefault: noop, }

class BrandingPage extends Component {
  componentDidMount() {
    if (this.props.federation.backgroundColor !== "") {
      this.setState({
        backgroundColor: this.props.federation.backgroundColor,
        color: this.props.federation.color,
      })
    }
  }

  shouldComponentUpdate() {
    return true
  }

  onHandleSubmit = (event = EVENT_STUB) => {
    event.preventDefault()
    this.props.router.push("/roster")
  }

  onChangeColor = color => {
    const newState = Object.assign({}, this.props.federation, {
      color: color.hex,
    })

    this.props.dispatch(updateFederation(newState))
  }

  onChangeBGColor = backgroundColor => {
    const newState = Object.assign({}, this.props.federation, {
      backgroundColor: backgroundColor.hex,
    })

    this.props.dispatch(updateFederation(newState))
  }

  displayName = "BrandingPage"

  render() {
    const { backgroundColor, color, name, } = this.props.federation
    const style = {
      backgroundColor,
      color,
    }
    return (
      <section className="page branding">
        <h1 className="col-xs-12 skew-forward" style={style}>
          🏳️ What colours represent you {name}? 🏳️
        </h1>
        <div className="row colours">
          <div className="col-xs-12 col-lg-6 center-xs middle-xs">
            <div className="box">
              <h5>Background</h5>
              <SwatchesPicker onChange={this.onChangeBGColor} />
            </div>
          </div>
          <div className="col-xs-12 col-lg-6 center-xs middle-xs right">
            <div className="box">
              <h5>Font</h5>
              <SwatchesPicker onChange={this.onChangeColor} />
            </div>
          </div>
        </div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <button type="submit" onClick={this.onHandleSubmit}>
            Paint Save and build your dream roster
          </button>
        </form>
      </section>
    )
  }
}

BrandingPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  federation: state.federation,
}))(BrandingPage)
