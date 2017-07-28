import React from "react"
import { Link } from "react-router"

import HeaderOne from "../components/h1/h1"

import "./stylesheets/welcome.scss"

const WelcomePage = () =>
  <section className="page welcome">
    <HeaderOne>Welcome to Fed Simulator</HeaderOne>
    <div className="row">
      <div className="col-xs-12 highlight pulse">
        <div className="box">
          <Link to="/name">
            I'll build this company from the ground up, dammit!
          </Link>
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-xs-12 highlight pulse">
        <div className="box">
          <Link to="/generate-automatically">
            This is an invasion, I bought the company
          </Link>
        </div>
      </div>
    </div>
  </section>

export default WelcomePage
