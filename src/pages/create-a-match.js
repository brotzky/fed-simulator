import React, { Component } from "react"
import PropTypes from "prop-types"
import groupBy from "lodash.groupby"
import classnames from "classnames"

import { connect } from "react-redux"
import { FadeIn } from "animate-components"

import { getId } from "../helpers/hash"
import { createMatch, resetMatches, simulateMatch } from "../actions/matches"
import { addWrestlerToMatch } from "../actions/matches"

import Wrestlers from "../components/wrestlers/container"
import { Winner, Loser } from "../components/winner/winner"
import HeaderOne from "../components/h1/h1"
import Match from "../components/match/container"
import Button from "../components/button/button"
import Model from "../models/match.model"

import buttonTexts from "../constants/create-a-match-button-texts"
import { MATCH_CONFIRM_RESET } from "../constants/confirmations"
import { ANIMATION_SPEED } from "../constants/animation"

import "./stylesheets/create-a-match.scss"

const pickRandom = items => items[Math.floor(Math.random() * (items.length - 1))]

class CreateAMatch extends Component {
  state = {
    currentMatch: { id: false, },
    teams: {},
  }

  componentWillMount() {
    let currentMatch

    const { location, router, dispatch, matches, } = this.props
    const matchId = location.query.id || false

    if (matchId) {
      currentMatch = matches.find(nextMatch => nextMatch.id === matchId)
    }
    if (!currentMatch) {
      currentMatch = new Model({
        id: getId(),
      }).toJSON()
      dispatch(createMatch(currentMatch))
    }

    const teams = this.getTeams(currentMatch)

    this.setState({
      currentMatch,
      teams,
    })

    if (!location.query.id && currentMatch.id) {
      router.push(`/create-a-match?id=${currentMatch.id}`)
    }
  }

  componentWillReceiveProps(nextProps) {
    let currentMatch

    currentMatch = nextProps.matches.find(currentMatch => currentMatch.id === this.state.currentMatch.id)

    if (!currentMatch) {
      const currentMatchId = getId()

      currentMatch = new Model({
        id: currentMatchId,
      }).toJSON()

      this.props.dispatch(createMatch(currentMatch))
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

  onWrestlerClick = wrestlerId => {
    console.log(wrestlerId)
    const { roster, dispatch, } = this.props
    const { currentMatch, } = this.state
    const teamId = getId()
    const wrestler = Object.assign({}, roster.find(wrestler => wrestler.id === wrestlerId), { teamId, })

    dispatch(
      addWrestlerToMatch({
        matchId: currentMatch.id,
        wrestler,
      })
    )
  }

  render() {
    const { animations, style, } = this.props
    const buttonText = pickRandom(buttonTexts)

    const { currentMatch, } = this.state
    const { wrestlers, } = currentMatch

    const winner = wrestlers && wrestlers.find(wrestler => wrestler.winner)
    const loser = wrestlers && wrestlers.find(wrestler => wrestler.loser)

    const numberOfTeams = Object.keys(this.state.teams).length
    const numberOfWrestlers = wrestlers.length

    const hasSidebar = wrestlers.findIndex(wrestler => wrestler.winner) > -1
    const mainClasses = classnames({ "col-xs": !hasSidebar, }, { "col-lg-9 col-md-8 col-sm-8 col-xs-12": hasSidebar, })
    const storySideclasses = classnames({ hide: !hasSidebar, }, { "col-lg-3 col-md-4 col-sm-4 col-xs-12": hasSidebar, })

    return (
      <section className="page create-a-match">
        <form onSubmit={this.onSimulateMatch}>
          <div className="row">
            <div className={mainClasses}>
              <div className="box">
                <HeaderOne>
                  Create a match &nbsp;
                  <i className="icon fa fa-trash" onClick={this.onResetMatches} />&nbsp;
                  <span className="medium-title">
                    <i className="icon fa fa-info-circle" /> Drag & drop wrestlers on teams
                  </span>
                </HeaderOne>
                <FadeIn iterations={Number(animations)} duration={ANIMATION_SPEED}>
                  <Match {...this.state} />
                </FadeIn>
                <If condition={numberOfWrestlers > 1 && numberOfTeams > 2 && !currentMatch.simulated}>
                  <Button value={buttonText} onClick={this.onSimulateMatch} type="submit" />
                </If>
              </div>
            </div>
            <div className={storySideclasses}>
              <div className="box center-xs">
                <If condition={winner}>
                  <Winner name={winner.name} />
                </If>
                <If condition={loser}>
                  <Loser name={loser.name} />
                </If>
              </div>
            </div>
          </div>
          <br />
          <Wrestlers onWrestlerClick={this.onWrestlerClick} style={style} />
        </form>
      </section>
    )
  }

  getTeams(currentMatch) {
    let teams =
      currentMatch && currentMatch.wrestlers && currentMatch.wrestlers.length > 0
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

  onConfirmMatchSimulated = event => {
    event.preventDefault
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
  animations: PropTypes.bool.isRequired,
  style: PropTypes.object,
  roster: PropTypes.array,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  matches: PropTypes.array.isRequired,
}

export default connect(state => ({
  matches: state.matches,
  style: state.style,
  roster: state.roster,
  animations: state.game.animations,
}))(CreateAMatch)
