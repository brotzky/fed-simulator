import React from "react"
import { connect } from "react-redux"
import { SlideRight, SlideLeft } from "animate-components"
import sortBy from "lodash.sortby"
import PropTypes from "prop-types"
import { Link } from "react-router"
import orderBy from "lodash.orderby"

import Simulator from "../components/simulator"
import Ranking from "../components/ranking/ranking"

import { ANIMATION_SPEED } from "../constants/animation"
import { COST_COLUMNS, RANKED_COLUMNS } from "../constants/ranking"

import "./stylesheets/dashboard.scss"

export const DashboardPage = ({ animations, style, expensiveWrestlers, cheapWrestlers, rankedMaleWrestlers, rankedFemaleWrestlers, }) => {
  const color = { color: style.color, }
  return (
    <section className="page dashboard zoom">
      <div className="row center-xs">
        <div className="col-xs-12">
          <div className="box">
            <h3>
              <Simulator />
            </h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <SlideLeft iterations={Number(animations)} duration={ANIMATION_SPEED}>
            <div className="box">
              <Ranking style={style} amountToShow={10} rows={rankedMaleWrestlers} columns={RANKED_COLUMNS} title="Ranked Male Wrestlers" />
            </div>
          </SlideLeft>
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <SlideRight iterations={Number(animations)} duration={ANIMATION_SPEED}>
            <div className="box">
              <Ranking style={style} amountToShow={10} rows={rankedFemaleWrestlers} columns={RANKED_COLUMNS} title="Ranked Female Wrestlers" />
            </div>
          </SlideRight>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <SlideLeft iterations={Number(animations)} duration={ANIMATION_SPEED}>
            <div className="box">
              <Ranking style={style} amountToShow={5} rows={expensiveWrestlers} columns={COST_COLUMNS} title="Expensive Wrestlers" />
            </div>
          </SlideLeft>
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <SlideRight iterations={Number(animations)} duration={ANIMATION_SPEED}>
            <div className="box">
              <Ranking style={style} amountToShow={5} rows={cheapWrestlers} columns={COST_COLUMNS} title="Cheaper Wrestlers" />
            </div>
          </SlideRight>
        </div>
      </div>
    </section>
  )
}

DashboardPage.displayName = "DashboardPage"

DashboardPage.propTypes = {
  animations: PropTypes.bool.isRequired,
  cheapWrestlers: PropTypes.array.isRequired,
  expensiveWrestlers: PropTypes.array.isRequired,
  rankedFemaleWrestlers: PropTypes.array.isRequired,
  rankedMaleWrestlers: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
}

export default connect(state => ({
  cheapWrestlers: sortBy(state.roster, "cost"),
  expensiveWrestlers: sortBy(state.roster, "cost").reverse(),
  rankedMaleWrestlers: orderBy(state.roster.filter(wrestler => wrestler.male), "points", "desc"),
  rankedFemaleWrestlers: orderBy(state.roster.filter(wrestler => !wrestler.male), "points", "desc"),
  roster: state.roster,
  iconColour: state.style.backgroundColor,
  ...state.game,
  style: state.style,
}))(DashboardPage)
