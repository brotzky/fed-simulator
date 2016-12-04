import React from "react"
import Ranking from "../components/ranking/ranking"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/ranking"

class RankingPage extends React.Component {

  static propTypes = {
    wrestlers: React.PropTypes.array.isRequired,
  }

  displayName = "RankingPage"

  render() {
    return (
      <div className="page ranking">
        <Helmet title="Universe Ranking" />
        <div className="row">
          <div className="col-lg-6 col-xs-16">
            <Ranking
              wrestlers={this.props.wrestlers
                .filter((wrestler) => wrestler.male === true)
                .sort((a, b) => a.wins > b.wins)
                .reverse()
              }
            />
          </div>
          <div className="col-lg-6 col-xs-16">
            <Ranking
              wrestlers={this.props.wrestlers
                .filter((wrestler) => wrestler.male === false)
                .sort((a, b) => a.wins > b.wins)
                .reverse()
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  wrestlers: state.wrestlers,
}))(RankingPage)
