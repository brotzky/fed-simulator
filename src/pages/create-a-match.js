import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import groupBy from "lodash.groupby"
import { Link } from "react-router"
import classNames from "classNames"
import { SlideRight, FadeIn } from "animate-components"

import { getId } from "../helpers/hash"
import { resetMatches, simulateMatch } from "../actions/matches"
import * as matchesAction from "../actions/matches"
import HeaderOne from "../components/h1/h1"
import Match from "../components/match/container"
import Model from "../reducers/match.model"
import Story from "../components/story/story"

import { MATCH_CONFIRM_RESET } from "../constants/confirmations"
import { ANIMATION_SPEED } from "../constants/animation"

import "./stylesheets/create-a-match.scss"

const pickRandom = items =>
  items[Math.floor(Math.random() * (items.length - 1))]

const buttonTexts = [
  "DING DING DING",
  "Ring the bell",
  "Start the match",
  "Start the damn match",
  "Simulate",
]

class CreateAMatch extends Component {
  state = {
    currentMatch: { id: false, },
    teams: {},
  }

  componentWillMount() {
    let currentMatch

    const matchId = this.props.location.query.id || false

    if (matchId) {
      currentMatch = this.props.matches.find(
        nextMatch => nextMatch.id === matchId
      )
    }
    if (!currentMatch) {
      currentMatch = new Model({
        id: getId(),
      }).toJSON()
      this.props.dispatch(matchesAction.createMatch(currentMatch))
    }

    const teams = this.getTeams(currentMatch)

    this.setState({
      currentMatch,
      teams,
    })

    if (!this.props.location.query.id && currentMatch.id) {
      this.props.router.push(`/create-a-match?id=${currentMatch.id}`)
    }
  }

  componentWillReceiveProps(nextProps) {
    let currentMatch

    currentMatch = nextProps.matches.find(
      currentMatch => currentMatch.id === this.state.currentMatch.id
    )

    if (!currentMatch) {
      const currentMatchId = getId()

      currentMatch = new Model({
        id: currentMatchId,
      }).toJSON()

      this.props.dispatch(matchesAction.createMatch(currentMatch))
    }

    const teams = this.getTeams(currentMatch)

    this.setState({
      currentMatch,
      teams,
    })
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const buttonText = pickRandom(buttonTexts)
    const { currentMatch, } = this.state
    const { animations, } = this.props
    const hasSidebar = currentMatch.story.length > 0
    const numberOfTeams = Object.keys(this.state.teams).length
    const numberOfWrestlers = this.state.currentMatch.wrestlers.length
    const mainClasses = classNames(
      { "col-xs": !hasSidebar, },
      { "col-lg-8": hasSidebar, }
    )
    const storySideclasses = classNames(
      { hide: !hasSidebar, },
      { "col-lg-4": hasSidebar, }
    )

    return (
      <section className="page create-a-match">
        <form onSubmit={this.onSimulateMatch}>
          <div className="row">
            <div className={mainClasses}>
              <div className="box">
                <HeaderOne>
                  Create a match
                  &nbsp;
                  <i
                    className="icon fa fa-trash"
                    onClick={this.onResetMatches}
                  />
                  &nbsp;
                  <If condition={currentMatch.id}>
                    <Link to={`/create-a-match?id=${currentMatch.id}`}>
                      <i
                        className="icon fa fa-refresh"
                        aria-hidden="true"
                        title="Refresh Match Link"
                      />
                    </Link>
                  </If>
                </HeaderOne>
                <FadeIn
                  iterations={Number(animations)}
                  duration={ANIMATION_SPEED}
                >
                  <Match {...this.state} />
                </FadeIn>
                <If condition={numberOfWrestlers > 1 && numberOfTeams > 2}>
                  <button type="submit">
                    {buttonText}
                  </button>
                </If>
              </div>
            </div>
            <br />
            <div className={storySideclasses}>
              <div className="box">
                <SlideRight
                  iterations={Number(animations)}
                  duration={ANIMATION_SPEED}
                >
                  <If condition={currentMatch.winner}>
                    <h2 className="story winner pulse">
                      <span>
                        <i
                          className="icon green fa fa-angle-double-up"
                          aria-hidden="true"
                        />
                        &nbsp;{currentMatch.winner.name} Wins
                      </span>
                    </h2>
                    <h3 className="story loser shake">
                      <span>
                        <i
                          className="icon red fa fa-angle-double-down"
                          aria-hidden="true"
                        />
                        &nbsp;{currentMatch.loser.name} Loses 😵
                      </span>
                    </h3>
                  </If>
                  <If condition={currentMatch.story.length > 0}>
                    <Story story={[]} />
                  </If>
                </SlideRight>
              </div>
            </div>
          </div>
        </form>
      </section>
    )
  }

  getTeams(currentMatch) {
    let teams = currentMatch &&
      currentMatch.wrestlers &&
      currentMatch.wrestlers.length > 0
      ? groupBy(currentMatch.wrestlers, "teamId")
      : {
          [getId()]: [],
        }

    // always add one more team
    return Object.assign({}, teams, { [getId()]: [], })
  }

  onSimulateMatch = event => {
    event.preventDefault()

    this.props.dispatch(simulateMatch(this.state.currentMatch.id))
  }

  onResetMatches = () => {
    if (confirm(MATCH_CONFIRM_RESET)) {
      this.props.dispatch(resetMatches())
    }
  }
}

CreateAMatch.contextTypes = {
  router: PropTypes.object.isRequired,
}

CreateAMatch.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  matches: state.matches,
  animations: state.game.animations,
}))(CreateAMatch)
