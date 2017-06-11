import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import groupBy from "lodash.groupby"
import { Link } from "react-router"
import classNames from "classNames"

import Story from "../components/story/story"
import Model from "../reducers/match.model"
import { getId } from "../helpers/hash"
import Match from "../components/match/container"
import { resetMatches, simulateMatch } from "../actions/matches"
import * as matchesAction from "../actions/matches"

import "./stylesheets/create-a-match.scss"

const CONFIRM_CLEAR = "Are you sure you want to clear your match history?"

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

    let winner, loser

    if (currentMatch.story.length > 0) {
      winner = currentMatch.wrestlers.find(wrestler => wrestler.winner)
      loser = currentMatch.story.reverse()[0].defender
    }

    const hasSidebar = currentMatch.story.length > 0
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
                <h1>
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
                        className="icon fa fa-external-link"
                        aria-hidden="true"
                        title="Save Match Link"
                      />
                    </Link>
                  </If>
                </h1>
                <Match {...this.state} />
                <button type="submit">
                  {buttonText}
                </button>
              </div>
            </div>
            <div className={storySideclasses}>
              <div className="box">
                <If condition={currentMatch.story.length > 0}>
                  <Story story={currentMatch.story} />
                </If>
                <If condition={winner}>
                  <h2 className="story winner pulse">
                    {winner.name} Wins
                  </h2>
                </If>
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
    if (confirm(CONFIRM_CLEAR)) {
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
}))(CreateAMatch)