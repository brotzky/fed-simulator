import React from "react"
import Ranking from "../../components/ranking/ranking"
import Icon from "../../components/icon/icon"
import Segments from "../../components/segments/segments"
import * as wrestlersActions from "../../actions/wrestlers"
import Secondary from "../../components/page/secondary"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { randomiseWrestlers, simulateMatch, logMatch } from "../../helpers/match"
import "./stylesheets/ranking"
const amountOfSims = [
  1,
  10,
  100,
  1000,
]
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
        wrestlers = this.props.wrestlers.filter(wrestler => brand.name === "Default" || wrestler.brand === brand.name),
        randomisedWrestlers = randomiseWrestlers(wrestlers),
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

    this.props.brands.filter(brand => brand.name !== "Default").forEach((brand, key) => {
      let value = this.props.wrestlers
          .filter(wrestler => wrestler.brand === brand.name)
          .reduce((sum, wrestler) => sum + wrestler.wins, 0),
        percent =  100 * value / totalWins

      if (value === 0) return

      segments.push({
        name: brand.name,
        value,
        percent,
      })
    })
    return (
      <div className="page ranking">
        <Helmet title="Universe Ranking" />
        <Secondary />
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
            {this.props.brands.filter((brand) => brand.name !== "Default").map((brand, key)=> {
              return (
                <div key={key} className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                  <Ranking
                    title={`${brand.name} Overall Ranking`}
                    amountToShow={5}
                    showLabels={false}
                    wrestlers={this.props.wrestlers
                      .filter((wrestler) => wrestler.brand === brand.name)
                      .sort((a, b) => a.wins > b.wins)
                      .reverse()
                    }
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  wrestlers: state.wrestlers,
  brands: state.brands,
}))(RankingPage)
