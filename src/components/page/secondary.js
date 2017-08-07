import React from "react"
import { Sticky } from "react-sticky"
import { connect } from "react-redux"

import { simulateRandomMatch } from "../actions/roster"

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
      <Sticky>
        <div className="navigation navigation--secondary">
          <ul className="navigation__list">
            <li key={key} className="navigation__item">
              <Icon name={brand.name} /> &nbsp;
              {amountOfSims.map((amount, key) => {
                return (
                  <span key={key}>
                    <a
                      onKeyPress={() =>
                        onSimulateBrandMatches({
                          amount,
                        })}
                      onKeyPress={() =>
                        onSimulateBrandMatches({
                          amount,
                        })}
                    >
                      {amount}
                    </a>, &nbsp;
                  </span>
                )
              })}
            </li>
          </ul>
        </div>
      </Sticky>
    )
  }
}

export default connect(state => ({
  roster: state.roster,
}))(PageSecondary)
