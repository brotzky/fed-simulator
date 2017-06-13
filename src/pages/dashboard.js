import React, { Component } from "react"
import { connect } from "react-redux"
import { SlideRight, SlideLeft, SlideUp } from "animate-components"

import Ranking from "../components/ranking/ranking"
import { formatCurrency } from "../helpers/currency"

import { ANIMATION_SPEED } from "../constants/animation"
import { COLUMNS_COST } from "../constants/ranking"
import currency from "../constants/currency"

import "./stylesheets/dashboard.scss"

const currencySymbol = currency.symbol

class DashboardPage extends Component {
  render() {
    const { cash, animations, } = this.props
    console.log(animations)

    return (
      <section className="page dashboard">
        <div className="row">
          <div className="col-xs-4">
            <SlideLeft
              iterations={Number(animations)}
              duration={ANIMATION_SPEED}
            >
              <div className="box game-cash">
                {formatCurrency(currencySymbol, cash)}
                <br />
                🤑
              </div>
            </SlideLeft>
          </div>
          <div className="col-xs-4">
            <SlideUp iterations={Number(animations)} duration={ANIMATION_SPEED}>
              <div className="box">
                <Ranking
                  amountToShow={5}
                  rows={this.props.expensiveWrestlers}
                  columns={COLUMNS_COST}
                  title="Expensive Wrestlers"
                />
              </div>
            </SlideUp>
          </div>
          <div className="col-xs-4">
            <SlideRight
              iterations={Number(animations)}
              duration={ANIMATION_SPEED}
            >
              <div className="box">
                <Ranking
                  amountToShow={5}
                  rows={this.props.cheapWrestlers}
                  columns={COLUMNS_COST}
                  title="Cheaper Wrestlers"
                />
              </div>
            </SlideRight>
          </div>
        </div>
      </section>
    )
  }
}

DashboardPage.displayName = "DashboardPage"

export default connect(state => ({
  roster: state.roster,
  cheapWrestlers: state.roster.sort((a, b) => a.cost > b.cost),
  expensiveWrestlers: state.roster.sort((a, b) => a.cost < b.cost),
  ...state.game,
}))(DashboardPage)
