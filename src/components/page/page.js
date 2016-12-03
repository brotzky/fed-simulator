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
            <div className="col-xs-2">
              <a className="header__link" href="#">WWE Universe</a>
            </div>
            <div className="col-xs-1">
              <Link
                to="champions">
                Champions
              </Link>
            </div>
            <div className="col-xs-1">
              <Link
                to="match">
                Match
              </Link>
            </div>
            <div className="col-xs-1">
              <Link
                to="draft">
                Draft
              </Link>
            </div>
          </div>
        </header>
        <section>
          {this.props.children}
        </section>
      </div>
    )
  }
}
