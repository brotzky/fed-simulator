import React from "react"
import { Link } from "react-router"
import Head from "../head/head"
import { connect } from "react-redux"
import "drag-drop-polyfill";
import "drag-drop-polyfill/release/drag-drop-polyfill"
import * as versionActions from "../../actions/version"
import navigation from "./navigation"

import logo from "./logo.png"
import "../../stylesheets/base"

class Page extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    version: React.PropTypes.number.isRequired,
  }

  static defaultProps = {
    version: 1,
  }

  componentWillMount() {
    this.props.dispatch(
      versionActions.checkVersion()
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.version !== this.props.version) {
      this.props.dispatch({
        type: "RESET",
      })
    }
  }

  render() {
    return (
      <div>
        <header className="header">
          <div className="navigation navigation--primary">
            <ul className="navigation__list">
              {navigation.map((navigationItem, key) => {
                return (
                  <li key={key} className="navigation__item">
                    <Link
                      to={navigationItem.url}>
                      {navigationItem.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </header>
        <section className="container-fluid">
          {this.props.children}
        </section>
      </div>
    )
  }
}


export default connect(state => ({
  version: state.version,
}))(Page)
