import React, { Component } from "react"
import { connect } from "react-redux"
import { SlideRight, SlideLeft, SlideUp } from "animate-components"
import sortBy from "lodash.sortby"

import Ranking from "../components/ranking/ranking"
import { formatCurrency } from "../helpers/currency"

import { ANIMATION_SPEED } from "../constants/animation"
import { COLUMNS_COST } from "../constants/ranking"
import currency from "../constants/currency"
import acronymLongName from "../helpers/acronym-long-name"

import "./stylesheets/dashboard.scss"

const currencySymbol = currency.symbol

class DashboardPage extends Component {
  render() {
    const { cash, animations, game, } = this.props

    return (
      <section className="page dashboard">
        <div className="row">
          <div className="col-xs-12 col-lg-4">
            <SlideLeft
              iterations={Number(animations)}
              duration={ANIMATION_SPEED}
            >
              <div className="box game-cash">
                🤑 {acronymLongName(game.name)}
                <br />
                {formatCurrency(currencySymbol, cash)}
              </div>
              <br />
            </SlideLeft>
          </div>
          <div className="col-lg-4 col-xs-12">
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
          <div className="col-lg-4 col-xs-12">
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
  game: state.game,
  cheapWrestlers: sortBy(state.roster, "cost"),
  expensiveWrestlers: sortBy(state.roster, "cost").reverse(),
  ...state.game,
}))(DashboardPage)
