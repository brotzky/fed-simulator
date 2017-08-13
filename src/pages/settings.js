import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { browserHistory } from "react-router"

import Animations from "../components/animations"
import { reset } from "../actions/game"
import HeaderOne from "../components/h1/h1"

import "./stylesheets/settings.scss"

class Settings extends Component {
  render() {
    const { style, } = this.props

    return (
      <section className="page settings">
        <HeaderOne>Settings</HeaderOne>
        <div className="row">
          <div className="col-xs-12">
            <div className="box" style={style}>
              <a onClick={browserHistory.goBack}>
                <i className="icon fa fa-arrow-left" />
                &nbsp; Go back
              </a>
            </div>
            <br />
            <div className="box" style={style}>
              <a onClick={this.onReset}>
                <i className="icon fa fa-trash-o" />
                &nbsp;Reset game
              </a>
            </div>
            <br />
            <div className="box" style={style}>
              <Animations>Toggle animations</Animations>
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

export default connect(state => ({
  style: state.style,
}))(Settings)
