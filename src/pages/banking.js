import React, { Component } from "react"
import Helmet from "react-helmet"

import HeaderOne from "../components/h1/h1"

import "./stylesheets/bank.scss"

class BankingPage extends Component {
  displayName = "BankingPage"

  render() {
    return (
      <section className="page ranking">
        <Helmet title="Banking" />
        <HeaderOne>
          <span>Banking</span>
        </HeaderOne>
      </section>
    )
  }
}

export default BankingPage
