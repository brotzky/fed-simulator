import React from "react"
import { Link } from "react-router"
import Head from "../head/head"
import "../../stylesheets/base"
import logo from "./logo.png"
import "./stylesheets/main"

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <header className="header">
          <div className="row">
            <div className="col-xs-2 text-left">
              <a className="header__link" href="#">
                <img src={logo} style={{ width: "55px" }} /> Universe
              </a>
            </div>
            <div className="col-xs-1 text-center">
              <Link
                to="champions">
                Champions
              </Link>
            </div>
            <div className="col-xs-1 text-center">
              <Link
                to="match">
                Match
              </Link>
            </div>
            <div className="col-xs-1 text-center">
              <Link
                to="draft">
                Draft
              </Link>
            </div>
            <div className="col-xs-7"></div>
          </div>
        </header>
        <section>
          {this.props.children}
        </section>
      </div>
    )
  }
}
