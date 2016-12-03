import React from "react"
import { Link } from "react-router"
import Draft from "../components/draft/draft"
import * as wrestlersActions from "../actions/wrestlers"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/draft"

class DraftPage extends React.Component {

  displayName = "DraftPage"

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
      wrestlersActions.moveAllWrestlersToDefault()
    )
  }

  render() {
    return (
      <div className="page draft">
        <Helmet title="Draft Management" />
        <div className="row" id="secondary">
          <div className="col-lg-2">
            <a
              href="#"
              onKeyPress={this.onSendToDraft}
              onClick={this.onSendToDraft}>
              Move wrestlers to Draft
            </a>
          </div>
          <div className="col-lg-2">
            <a
              href="#"
              onKeyPress={this.onReset}
              onClick={this.onReset}>
              Move all wrestlers to their current brand
            </a>
          </div>
        </div>
        <Draft />
      </div>
    )
  }
}

export default connect(state => ({}))(DraftPage)
