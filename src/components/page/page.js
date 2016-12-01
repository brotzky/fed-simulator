import React from "react"
import { Link } from "react-router"
import Head from "../head/head"
import "../../stylesheets/base"
import logo from "./logo.png"

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <Head />
        <header>
          <h1>
            <img
              src={logo}
              alt="WWE"
              title="WWE"
            />
            <span> Universe</span>
          </h1>
        </header>
        <hr />
        <ul className="nav nav-pills" role="tablist">
          <li>
            <Link
              to="draft">
              Draft
            </Link>
          </li>
          <li>
            <Link
              to="match">
              Match
            </Link>
          </li>
          <li>
            <Link
              to="champions">
              Champions
            </Link>
          </li>
        </ul>
        <hr />
        {this.props.children}
      </div>
    )
  }
}
