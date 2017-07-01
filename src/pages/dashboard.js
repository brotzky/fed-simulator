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

export const DashboardPage = ({
  cash,
  animations,
  game,
  roster,
  expensiveWrestlers,
  cheapWrestlers,
}) => (
  <section className="page dashboard">
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-lg-2 text-center">
        <SlideLeft iterations={Number(animations)} duration={ANIMATION_SPEED}>
          <div className="box infopane">
            <p className="infopane__name">
              {acronymLongName(game.name)}
            </p>
            <p className="infopane__cash">
              {formatCurrency(currencySymbol, cash)}
            </p>
            <p className="infopane__roster">
              {roster.length} Wrestlers
            </p>
          </div>
          <br />
        </SlideLeft>
      </div>
      <div className="col-xs-12 col-sm-6 col-lg-5">
        <SlideUp iterations={Number(animations)} duration={ANIMATION_SPEED}>
          <div className="box">
            <Ranking
              amountToShow={5}
              rows={expensiveWrestlers}
              columns={COLUMNS_COST}
              title="Expensive Wrestlers"
            />
          </div>
        </SlideUp>
      </div>
      <div className="col-xs-12 col-sm-6 col-lg-5">
        <SlideRight iterations={Number(animations)} duration={ANIMATION_SPEED}>
          <div className="box">
            <Ranking
              amountToShow={5}
              rows={cheapWrestlers}
              columns={COLUMNS_COST}
              title="Cheaper Wrestlers"
            />
          </div>
        </SlideRight>
      </div>
    </div>
  </section>
)

DashboardPage.displayName = "DashboardPage"

export default connect(state => ({
  roster: state.roster,
  game: state.game,
  cheapWrestlers: sortBy(state.roster, "cost"),
  expensiveWrestlers: sortBy(state.roster, "cost").reverse(),
  ...state.game,
}))(DashboardPage)
