import React from "react"
import Icon from "../icon/icon"
import * as wrestlersActions from "../../actions/wrestlers"
import { Sticky } from "react-sticky"
import { connect } from "react-redux"
import { randomiseWrestlers, simulateMatch, logMatch } from "../../helpers/match"
const amountOfSims = [
  1,
  10,
  100,
  1000,
]

class PageSecondary extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    moves: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array.isRequired,
    showClear: React.PropTypes.bool,
  }

  static defaultProps = {
    showClear: false,
  }

  displayName = "PageSecondary"

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
      let wrestlers = this.props.wrestlers.filter(wrestler => brand.default || wrestler.brand === brand.name),
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
    return (
      <Sticky>
        <div className="navigation navigation--secondary">
          <ul className="navigation__list">
            {this.props.brands.map((brand, key) => {
              return (
                <li key={key}
                  className="navigation__item">
                  <Icon name={brand.name} /> &nbsp;
                  {amountOfSims.map((amount, key) => {
                    return (
                      <span key={key}>
                        <a onKeyPress={this.onSimulateBrandMatches.bind(this, { amount, brand })}
                          onClick={this.onSimulateBrandMatches.bind(this, { amount, brand })}>
                          {amount}
                        </a>,	&nbsp;
                      </span>
                    )
                  })}
                </li>
              )
            })}
            <If condition={this.props.showClear}>
              <li className="navigation__item">
                <a
                  onKeyPress={this.onReset}
                  onClick={this.onReset}>
                  Clear wins & losses
                </a>
              </li>
            </If>
          </ul>
        </div>
      </Sticky>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  wrestlers: state.wrestlers,
  brands: state.brands,
}))(PageSecondary)
