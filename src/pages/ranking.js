import { connect } from "react-redux"
import orderBy from "lodash/orderBy"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { SlideRight, SlideLeft } from "animate-components"

import {
  simulateGeneratedRandomMatches,
  generateRandomMatches
} from "../actions/matches"
import { saveMatchPointsToWrestlers } from "../actions/roster"
import HeaderOne from "../components/h1/h1"
import Ranking from "../components/ranking/ranking"

import { ANIMATION_SPEED } from "../constants/animation"

import "./stylesheets/ranking.scss"

const COLUMNS = ["rank", "name", "points", "wins", "losses",]

class RankingPage extends Component {
  displayName = "RankingPage"

  render() {
    const { animations, roster, matches, } = this.props
    const orderedRoster = orderBy(roster, "points", "desc")
    const maleWrestlers = orderedRoster.filter(wrestler => wrestler.male)
    const femaleWrestlers = orderedRoster.filter(wrestler => !wrestler.male)

    return (
      <div>
        <section className="page ranking">
          <HeaderOne>
            <span className="gold pop">🌟 Winners </span>
            <span>&nbsp; and &nbsp;</span>
            <span className="gray push"> 🗑 Losers</span>
          </HeaderOne>
          <div className="row middle-xs center-xs">
            <div className="col-xs-6 col-lg-3">Simulate random matches:</div>
            <div className="col-xs-2 col-lg-1">
              <a onClick={() => this.simulateRandomMatches(50)}>50</a>
            </div>
            <div className="col-xs-2 col-lg-1">
              <a onClick={() => this.simulateRandomMatches(100)}>100</a>
            </div>
            <div className="col-xs-2 col-lg-1">
              <a onClick={() => this.simulateRandomMatches(150)}>150</a>
            </div>
            <div className="text-center col-xs-6 col-lg-offset-1 col-lg-3">
              <strong>{matches.length} matches</strong>
            </div>
            <div className="text-center col-xs-6 col-lg-2">
              <button onClick={this.saveSimulatedMatchPoints}>
                Save points
              </button>
            </div>
          </div>
          <br />
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
      </div>
    )
  }

  simulateRandomMatches = amountOfMatches => {
    const { roster, dispatch, } = this.props

    dispatch(generateRandomMatches({ amountOfMatches, roster, }))
    dispatch(simulateGeneratedRandomMatches())
  }

  saveSimulatedMatchPointsToWrestlers = () => {
    const { matches, dispatch, } = this.props

    dispatch(saveMatchPointsToWrestlers({ matches, }))
  }
}

RankingPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

RankingPage.propTypes = {
  dispatch: PropTypes.func,
  roster: PropTypes.array,
  shows: PropTypes.array,
  matches: PropTypes.array,
  animations: PropTypes.object,
  router: PropTypes.object,
}

export default connect(state => ({
  roster: state.roster,
  matches: state.matches,
  shows: state.shows,
  animations: state.game.animations,
}))(RankingPage)
