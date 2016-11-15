import React from "react"
import Head from "../head/head"
import "../../stylesheets/base"

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <Head />
        <header>
          <h1>
            <img
              src="static/media/wwe.png"
              alt="WWE"
              title="WWE"
            />
            <span> Universe</span>
          </h1>
        </header>
        <hr />
        <ul className="nav nav-pills" role="tablist">
          <li>
            <a
              href="draft">
              Draft
            </a>
          </li>
          <li>
            <a
              href="calendar">
              Calendar
            </a>
          </li>
        </ul>
        <hr />
        {this.props.children}
      </div>
    )
  }
}
