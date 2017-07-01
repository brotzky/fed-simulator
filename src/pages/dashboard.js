import React from "react"
import { connect } from "react-redux"
import { SlideRight, SlideUp } from "animate-components"
import sortBy from "lodash.sortby"
import PropTypes from "prop-types"

import Ranking from "../components/ranking/ranking"

import { ANIMATION_SPEED } from "../constants/animation"
import { COLUMNS_COST } from "../constants/ranking"

import "./stylesheets/dashboard.scss"

export const DashboardPage = ({
  animations,
  expensiveWrestlers,
  cheapWrestlers,
}) => (
  <section className="page dashboard">
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
  expensiveWrestlers: PropTypes.array.isRequired,
  cheapWrestlers: PropTypes.array.isRequired,
}
export default connect(state => ({
  roster: state.roster,
  cheapWrestlers: sortBy(state.roster, "cost"),
  expensiveWrestlers: sortBy(state.roster, "cost").reverse(),
  ...state.game,
}))(DashboardPage)
