import React from "react"
import { Link } from "react-router"
import Head from "../head/head"
import { connect } from "react-redux"
import "../../stylesheets/base"

class Page extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  onReset = (event) => {
    event.preventDefault()
    this.props.dispatch({
      type: "RESET",
    })
  }

  render() {
    return (
      <div>
        <Head />
        {this.props.children}
        <ul className="nav nav-pills" role="tablist">
          <li>
            <Link to={"/"}>
              WWE Draft Generator
            </Link>
          </li>
          <li>
            <Link to={"/about"}>
              About
            </Link>
          </li>
          <li>
            <a
              href="#"
              onKeyPress={this.onReset}
              onClick={this.onReset}>
              Reset Choices
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
export default connect(state => ({}))(Page)
