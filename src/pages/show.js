import React from "react"
import Bell from "../components/bell/bell"
import Match from "../components/match/match"
import Wrestlers from "../components/wrestlers/wrestlers"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/show"

class ShowPage extends React.Component {

  static propTypes = {
    wrestlers: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array.isRequired,
  }

  onBellRung () {

  }

  displayName = "ShowPage"

  render() {
    return (
      <div className="page show">
        <Helmet title="Create Show" />
        <div className="row">
          <div className="col-xs-6">
            <Bell onBellRung={this.onBellRung} />
            <br />
            <Match
              showWrestlers={false}
            />
            <Match
              showWrestlers={false}
            />
          </div>
          <div className="col-xs-6">
            <Wrestlers
              wrestlers={this.props.wrestlers}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  wrestlers: state.wrestlers,
}))(ShowPage)
