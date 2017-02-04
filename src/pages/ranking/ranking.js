import "./stylesheets/ranking"
import { connect } from "react-redux"
import { randomiseWrestlers, simulateMatch, logMatch } from "../../helpers/match"
import * as wrestlersActions from "../../actions/wrestlers"
import Helmet from "react-helmet"
import Ranking from "../../components/ranking/ranking"
import React from "react"
import Simulations from "../../components/navigation/simulations"
import Segments from "../../components/segments/segments"

class RankingPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    moves: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array.isRequired,
  }

  displayName = "RankingPage"

  onReset = (event) => {
    event.preventDefault()
    this.props.dispatch(
      wrestlersActions.reset()
    )
  }

  onSimulateBrandMatches = ({
    amount,
    brand,
  }) => {
    while (amount > 0) {
      let
        wrestlers = this.props.wrestlers.filter(wrestler => brand.name === "" || wrestler.brand === brand.name),
        randomisedWrestlers = randomiseWrestlers({
          wrestlers,
        }),
        story = simulateMatch(
          randomisedWrestlers,
          this.props.moves,
        )

      logMatch(this.props.dispatch, story)
      amount--
    }
  }

  render() {
    let segments = [],
      totalWins = this.props.wrestlers.reduce((sum, wrestler) => sum + wrestler.wins, 0)

    this.props.brands.forEach((brand) => {
      let value = this.props.wrestlers
          .filter(wrestler => wrestler.brand === brand.name)
          .reduce((sum, wrestler) => sum + wrestler.wins, 0),
        percent =  100 * value / totalWins

      if (value === 0) return

      segments.push({
        name: brand.name,
        bgColour: brand.bgColour,
        textColour: brand.textColour,
        value,
        percent,
      })
    })
    return (
      <main className="page-section ranking">
        <Helmet title="Rankings" />
        <If condition={this.props.wrestlers.length > 0}>
          <Simulations />
          <div className="inpage-content">
            <div className="row">
              <div className="col-xs-12 statistic">
                <Segments segments={segments} />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-6 col-xs-12">
                <Ranking
                  title="Overall Male Superstars"
                  amountToShow={10}
                  wrestlers={this.props.wrestlers
                    .filter((wrestler) => wrestler.male === true)
                    .sort((a, b) => a.wins > b.wins)
                    .reverse()
                  }
                />
              </div>
              <div className="col-lg-6 col-xs-12">
                <Ranking
                  title="Overall Female Superstars"
                  amountToShow={10}
                  wrestlers={this.props.wrestlers
                    .filter((wrestler) => wrestler.male === false)
                    .sort((a, b) => a.wins > b.wins)
                    .reverse()
                  }
                />
              </div>
            </div>
            <div className="row ranking__split">
              {this.props.brands
                .filter((brand) => !brand.default)
                .map((brand, key)=> {
                return (
                  <Ranking
                    key={key}
                    className="col-lg-4 col-md-12 col-sm-12 col-xs-12"
                    title={`${brand.name} Overall Ranking`}
                    amountToShow={5}
                    showLabels={false}
                    wrestlers={this.props.wrestlers
                      .filter((wrestler) => wrestler.brand === brand.name)
                      .sort((a, b) => a.wins > b.wins)
                      .reverse()
                    }
                  />
                )
              })}
            </div>
          </div>
        </If>
      </main>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  wrestlers: state.wrestlers,
  brands: state.brands,
}))(RankingPage)
