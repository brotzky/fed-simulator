import React from "react"
import { connect } from "react-redux"
import { SlideRight, SlideUp } from "animate-components"
import sortBy from "lodash.sortby"
import PropTypes from "prop-types"
import { Link } from "react-router"
import Helmet from "react-helmet"

import Ranking from "../components/ranking/ranking"
import HeaderOne from "../components/h1/h1"

import { ANIMATION_SPEED } from "../constants/animation"
import { COLUMNS_COST } from "../constants/ranking"

import "./stylesheets/dashboard.scss"

export const DashboardPage = ({
  animations,
  expensiveWrestlers,
  cheapWrestlers,
  iconColour,
}) => (
  <section className="page dashboard zoom">
    <Helmet title="Dashboard" />
    <HeaderOne>
      <i
        className="icon fa fa-binoculars"
        style={{
          color: iconColour,
        }}
      /> Dashing dashboard
    </HeaderOne>
    <div className="row">
      <div className="col-xs-6">
        <div className="box">
          <Link to="/create-a-match">
            <button className="btn">Create a Match</button>
          </Link>
        </div>
      </div>
      <div className="col-xs-6">
        <div className="box">
          <Link to="/create-a-match">
            <button className="btn">Calendar</button>
          </Link>
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-xs-12 col-sm-6 col-lg-6">
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
      <div className="col-xs-12 col-sm-6 col-lg-6">
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

DashboardPage.propTypes = {
  animations: PropTypes.bool.isRequired,
  cheapWrestlers: PropTypes.array.isRequired,
  expensiveWrestlers: PropTypes.array.isRequired,
  iconColour: PropTypes.string.isRequired,
}
export default connect(state => ({
  cheapWrestlers: sortBy(state.roster, "cost"),
  expensiveWrestlers: sortBy(state.roster, "cost").reverse(),
  roster: state.roster,
  iconColour: state.style.backgroundColor,
  ...state.game,
}))(DashboardPage)
