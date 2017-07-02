import { connect } from "react-redux"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { SlideLeft } from "animate-components"

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
          <span className="gold pop">Banking</span>
        </HeaderOne>
        <SlideLeft>
          <div className="row">
            <div className="col-lg-4 col-xs-12"><Accounting /></div>
            <div className="col-lg-offset-1 col-lg-7 col-xs-12">
              Roster ({roster.length})
            </div>
          </div>
        </SlideLeft>
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
