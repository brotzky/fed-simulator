import React from "react"
import { connect } from "react-redux"

import { simulateRandomMatch } from "../../actions/roster"

const amountOfSims = [1, 10, 100, 1000,]

class PageSecondary extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    roster: React.PropTypes.array.isRequired,
  }

  displayName = "PageSecondary"

  onSimulateBrandMatches = ({ amount, }) => {
    while (amount > 0) {
      this.props.dispatch(simulateRandomMatch())
      amount--
    }
  }

  render() {
    return (
      <nav className="navigation navigation--secondary">
        {amountOfSims.map((amount, key) => {
          return (
            <span key={key}>
              <a
                onKeyPress={() =>
                  this.onSimulateBrandMatches({
                    amount,
                  })}
                onClick={() =>
                  this.onSimulateBrandMatches({
                    amount,
                  })}
              >
                {amount}
              </a>, &nbsp;
            </span>
          )
        })}
      </nav>
    )
  }
}

export default connect()(PageSecondary)
