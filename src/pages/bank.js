import { connect } from "react-redux"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { SlideRight } from "animate-components"

import Accounting from "../components/accounting/container"
import HeaderOne from "../components/h1/h1"

import "./stylesheets/bank.scss"

class BankPage extends Component {
  displayName = "BankPage"

  render() {
    const { roster, } = this.props
    return (
      <section className="page ranking">
        <HeaderOne>
          <span className="gold pop">Bank</span>
        </HeaderOne>
        <SlideRight>
          <div className="row">
            <div className="col-xs-4"><Accounting /></div>
            <div className="col-xs-8">Roster ({roster.length})</div>
          </div>
        </SlideRight>
      </section>
    )
  }
}

BankPage.propTypes = {
  roster: PropTypes.array.isRequired,
  shows: PropTypes.array.isRequired,
}

export default connect(state => ({
  roster: state.roster,
  shows: state.shows,
}))(BankPage)
