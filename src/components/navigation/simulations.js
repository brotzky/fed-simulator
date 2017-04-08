import { connect } from "react-redux"
import { randomiseWrestlers, simulateMatch, logMatch } from "../../helpers/match"
import * as wrestlersActions from "../../actions/wrestlers"
import React from "react"
import PropTypes from "prop-types"

const amountOfSims = [
  1,
  10,
  100,
  500,
]

class PageSecondary extends React.Component {

  static propTypes = {
    brands: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    moves: PropTypes.array.isRequired,
    showClear: PropTypes.bool,
    wrestlers: PropTypes.array.isRequired,
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
        randomisedWrestlers = randomiseWrestlers({
          wrestlers,
        }),
        byPassMoves = true,
        story = simulateMatch(
          randomisedWrestlers,
          this.props.moves,
          byPassMoves,
        )

      logMatch(this.props.dispatch, story)
      amount--
    }
  }

  render() {
    return (
      <div className="navigation navigation--secondary">
        <ul className="navigation__list">
          {this.props.brands.map((brand, key) => {
            return (
              <li key={key}
                className="navigation__item">
                {brand.name}:&nbsp;
                {amountOfSims.map((amount, key) => {
                  return (
                    <span key={key}>
                      <a onKeyPress={this.onSimulateBrandMatches.bind(this, { amount, brand, })}
                        onClick={this.onSimulateBrandMatches.bind(this, { amount, brand, })}>
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
              <a onKeyPress={this.onReset}
                onClick={this.onReset}>
                Clear wins & losses
              </a>
            </li>
          </If>
        </ul>
      </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  wrestlers: state.wrestlers,
  brands: state.brands,
}))(PageSecondary)
