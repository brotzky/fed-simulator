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
          <div className="navigation navigation--primary">
            <div className="navigation__item">
              <a className="header__link" href="#">
                <img src={logo} style={{
                  width: "55px",
                }} /> Universe
              </a>
            </div>
            <div className="navigation__item">
              <Link
                to="draft">
                Draft
              </Link>
            </div>
            <div className="navigation__item">
              <Link
                to="champions">
                Champions
              </Link>
            </div>
            <div className="navigation__item">
              <Link
                to="ranking">
                Ranking
              </Link>
            </div>
            <div className="navigation__item">
              <Link
                to="match">
                Match
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
