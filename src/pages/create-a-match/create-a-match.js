import React, { Component } from "react"
import PropTypes from "prop-types"
import groupBy from "lodash.groupby"

import { connect } from "react-redux"
import { FadeIn } from "animate-components"

import { getId } from "../../helpers/hash"
import { createMatch, resetMatches, simulateMatch } from "../../actions/matches"
import { addWrestlerToMatch } from "../../actions/matches"

import Wrestlers from "../../components/wrestlers/container"
import { Winner, Loser } from "../../components/winner/winner"
import HeaderOne from "../../components/h1/h1"
import Match from "../../components/match/container"
import Button from "../../components/button/button"
import Model from "../../models/match.model"

import buttonTexts from "../../constants/create-a-match-button-texts"
import { MATCH_CONFIRM_RESET } from "../../constants/confirmations"
import { ANIMATION_SPEED } from "../../constants/animation"

import "./create-a-match.scss"

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

    return (
      <section className="page create-a-match">
        <form onSubmit={this.onSimulateMatch}>
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <HeaderOne>
                  Create a match &nbsp;
                  <i className="icon fa fa-trash" onClick={this.onResetMatches} />&nbsp;
                  <span className="medium-title">
                    <i className="icon fa fa-info-circle" /> Click or Drag wrestlers on teams
                  </span>
                </HeaderOne>
                <Match {...this.state} />
                <If condition={numberOfWrestlers > 1 && numberOfTeams > 2 && !currentMatch.simulated}>
                  <Button value={buttonText} onClick={this.onSimulateMatch} type="submit" />
                </If>
              </div>
            </div>
            <If condition={winner && loser}>
              <div className="col-xs-12">
                <FadeIn iterations={Number(animations)} duration={ANIMATION_SPEED}>
                  <div className="box middle-xs center-xs">
                    <br />
                    <Winner name={winner.name} />
                    <br />
                    <Loser name={loser.name} />
                  </div>
                </FadeIn>
              </div>
            </If>
          </div>
          <br />
          <Wrestlers onClick={this.onWrestlerClick} style={style} />
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
  animations: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  matches: PropTypes.array.isRequired,
  roster: PropTypes.array,
  router: PropTypes.object.isRequired,
  style: PropTypes.object,
}

export default connect(state => ({
  animations: state.game.animations,
  matches: state.matches,
  roster: state.roster,
  style: state.style,
}))(CreateAMatch)
