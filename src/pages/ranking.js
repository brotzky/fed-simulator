import { connect } from "react-redux"
import orderBy from "lodash/orderBy"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { SlideRight, SlideLeft } from "animate-components"

import {
  simulateGeneratedRandomMatches,
  generateRandomMatches
} from "../actions/matches"
import HeaderOne from "../components/h1/h1"
import Ranking from "../components/ranking/ranking"

import { ANIMATION_SPEED } from "../constants/animation"

import "./stylesheets/ranking.scss"

const COLUMNS = ["rank", "name", "points", "wins", "losses",]

class RankingPage extends Component {
  displayName = "RankingPage"

  componentDidMount() {
    if (this.props.shows.length === 0) {
      this.props.router.push("/shows")
    }
  }

  render() {
    const { animations, roster, } = this.props
    const orderedRoster = orderBy(roster, "points", "desc")
    const maleWrestlers = orderedRoster.filter(wrestler => wrestler.male)
    const femaleWrestlers = orderedRoster.filter(wrestler => !wrestler.male)

    return (
      <div>
        <nav>
          <strong>Simulate random matches:</strong>
          <ul>
            <li><a onClick={() => this.simulateRandomMatches(50)}>50</a></li>
            <li><a onClick={() => this.simulateRandomMatches(100)}>100</a></li>
            <li><a onClick={() => this.simulateRandomMatches(150)}>150</a></li>
          </ul>
        </nav>
        <section className="page ranking">
          <HeaderOne>
            <span className="gold pop">🌟 Winners </span>
            <span>&nbsp; and &nbsp;</span>
            <span className="gray push"> 🗑 Losers</span>
          </HeaderOne>
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
    this.props.dispatch(
      generateRandomMatches({ amountOfMatches, roster: this.props.roster, })
    )
    this.props.dispatch(simulateGeneratedRandomMatches())
  }
}

RankingPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

RankingPage.propTypes = {
  dispatch: PropTypes.func,
  roster: PropTypes.array,
  shows: PropTypes.array,
  animation: PropTypes.object,
  router: PropTypes.object,
}

export default connect(state => ({
  roster: state.roster,
  shows: state.shows,
  animations: state.game.animations,
}))(RankingPage)
