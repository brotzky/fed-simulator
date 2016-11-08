import React from "react"
import { Link } from "react-router"
import BucketDrops from "../components/bucket-drops/bucket-drops"
import * as dropsActions from "../actions/drops"
import Helmet from "react-helmet"
import { connect } from "react-redux"

class PageBucketDrops extends React.Component {

  displayName="PageBucketDrops"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  onReset = (event) => {
    event.preventDefault()
    this.props.dispatch({
      type: "RESET",
    })
  }

  onSendToDraft = (event) => {
    event.preventDefault()
    this.props.dispatch(
      dropsActions.moveDropsToDefault()
    )
  }

  render() {
    return (
      <div>
        <Helmet title="Bucket Drops" />
        <header>
          <h1>
            <img
              src="static/media/wwe.png"
              alt="WWE"
              title="WWE"
            />
            <span> Draft Generator</span>
          </h1>
        </header>
        <hr />
        <ul className="nav nav-pills" role="tablist">
          <li>
            <a
              href="#"
              onKeyPress={this.onSendToDraft}
              onClick={this.onSendToDraft}>
              Move wrestlers to Draft
            </a>
          </li>
          <li>
            <a
              href="#"
              onKeyPress={this.onReset}
              onClick={this.onReset}>
              Move all wrestlers to their current brand
            </a>
          </li>
        </ul>
        <hr />
        <BucketDrops />
      </div>
    )
  }
}

export default connect(state => ({}))(PageBucketDrops)
