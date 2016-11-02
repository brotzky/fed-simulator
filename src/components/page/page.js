import React, { Component } from "react"
import { Link } from "react-router"
import Head from "../head/head"
import { connect } from "react-redux"
import "../../stylesheets/base"

class Page extends Component {

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
        <Link to={"/"}>
          WWE Draft Generator
        </Link> | <Link to={"/about"}>
          About
        </Link> |
        <a
          href="#"
          className="btn clearfix"
          onKeyPress={this.onReset}
          onClick={this.onReset}>
          Reset Choices
        </a>
      </div>
    )
  }
}
export default connect(state => ({}))(Page)
