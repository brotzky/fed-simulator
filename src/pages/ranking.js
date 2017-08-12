import { connect } from "react-redux"
import orderBy from "lodash/orderBy"
import PropTypes from "prop-types"
import React from "react"
import { SlideRight, SlideLeft } from "animate-components"

import Simulator from "../components/simulator"
import HeaderOne from "../components/h1/h1"
import Ranking from "../components/ranking/ranking"

import { ANIMATION_SPEED } from "../constants/animation"

import "./stylesheets/ranking.scss"

const COLUMNS = ["rank", "name", "points", "wins", "losses",]

let RankingPage = ({ animations, femaleWrestlers, maleWrestlers, }) => {
  return (
    <section className="page ranking">
      <HeaderOne>
        <span className="gold pop">🌟 Winners </span>
        <span>&nbsp; and &nbsp;</span>
        <span className="gray push"> 🗑 Losers</span>
      </HeaderOne>
      <div className="row">
        <div className="col-xs-12">
          <div className="box">
            <button>
              <Simulator />
            </button>
          </div>
        </div>
      </div>
      <div className="row top-xs">
        <div className="col-xs-12 col-sm-12 col-md 6 col-lg-6">
          <div className="box">
            <If condition={maleWrestlers.length > 0}>
              <SlideLeft
                iterations={Number(animations)}
                duration={ANIMATION_SPEED}
              >
                <Ranking
                  title="Male Wrestlers"
                  rows={maleWrestlers}
                  columns={COLUMNS}
                />
              </SlideLeft>
            </If>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md 6 col-lg-6">
          <div className="box">
            <If condition={femaleWrestlers.length > 0}>
              <SlideRight
                iterations={Number(animations)}
                duration={ANIMATION_SPEED}
              >
                <Ranking
                  title="Female Wrestlers"
                  rows={femaleWrestlers}
                  columns={COLUMNS}
                />
              </SlideRight>
            </If>
          </div>
        </div>
      </div>
    </section>
  )
}

RankingPage.propTypes = {
  femaleWrestlers: PropTypes.array.isRequired,
  maleWrestlers: PropTypes.array.isRequired,
  animations: PropTypes.bool.isRequired,
}

export default connect(state => ({
  maleWrestlers: orderBy(
    state.roster.filter(wrestler => wrestler.male),
    "points",
    "desc"
  ),
  femaleWrestlers: orderBy(
    state.roster.filter(wrestler => !wrestler.male),
    "points",
    "desc"
  ),
  animations: state.game.animations,
}))(RankingPage)
