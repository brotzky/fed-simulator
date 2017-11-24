import React from "react"
import { connect } from "react-redux"
import sortBy from "lodash.sortby"
import PropTypes from "prop-types"
import orderBy from "lodash.orderby"

import Champions from "../../components/champions/champions"
import HeaderOne from "../../components/h1/h1"
import Simulator from "../../components/simulator"
import Ranking from "../../components/ranking/ranking"

import { RANKED_COLUMNS } from "../../constants/ranking"

import "./dashboard.scss"

export const DashboardPage = ({ style, rankedMaleWrestlers, rankedFemaleWrestlers, champions }) => (
  <section className="page dashboard zoom">
    <HeaderOne>
      Dashboard{" "}
      <span className="medium-title">
        <Simulator />
      </span>
    </HeaderOne>
    <div className="row">
      <Champions />
    </div>
    <div className="row">
      <div className="col-xs-12 col-sm-6 col-lg-6">
        <div className="box">
          <Ranking style={style} amountToShow={30} rows={rankedMaleWrestlers} columns={RANKED_COLUMNS} title="Ranked Male Wrestlers" />
        </div>
      </div>
      <div className="col-xs-12 col-sm-6 col-lg-6">
        <div className="box">
          <Ranking style={style} amountToShow={30} rows={rankedFemaleWrestlers} columns={RANKED_COLUMNS} title="Ranked Female Wrestlers" />
        </div>
      </div>
    </div>
  </section>
)

DashboardPage.displayName = "DashboardPage"

DashboardPage.propTypes = {
  rankedFemaleWrestlers: PropTypes.array.isRequired,
  rankedMaleWrestlers: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
}

export default connect(state => ({
  rankedMaleWrestlers: orderBy(state.federation.roster.filter(wrestler => wrestler.male), "points", "desc"),
  rankedFemaleWrestlers: orderBy(state.federation.roster.filter(wrestler => !wrestler.male), "points", "desc"),
  ...state.game,
  style: state.style,
}))(DashboardPage)
