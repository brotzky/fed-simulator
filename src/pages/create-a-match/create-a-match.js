import React from "react"
import { List } from "immutable"
import PropTypes from "prop-types"

import { FadeIn } from "animate-components"

import Wrestlers from "../../components/wrestlers/container"
import { Winner, Loser } from "../../components/winner/winner"
import HeaderOne from "../../components/h1/h1"
import Match from "../../components/match/container"
import Button from "../../components/button/button"

import { ANIMATION_SPEED } from "../../constants/animation"

const NOOP = () => {}

import "./create-a-match.scss"

const CreateAMatch = ({ onSimulateMatch, onReset, buttonText, winner, loser, onWrestlerClick, style, currentMatch, }) => {
  const numberOfWrestlers = new List(currentMatch.wrestlers).size
  return (
    <section className="page create-a-match">
      <form onSubmit={onSimulateMatch}>
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <HeaderOne>
                Create a match &nbsp;
                <i tabIndex="0" className="icon fa fa-trash" onKeyPress={onReset} onClick={onReset} />&nbsp;
                <span className="medium-title">
                  <i className="icon fa fa-info-circle" /> Click or Drag wrestlers on teams
                </span>
              </HeaderOne>
              <Match currentMatch={currentMatch} />
              <If condition={numberOfWrestlers > 1}>
                <Button value={buttonText} onClick={onSimulateMatch} type="submit" />
              </If>
            </div>
          </div>
          <If condition={winner.name && loser.name}>
            <div className="col-xs-12">
              <FadeIn iterations={1} duration={ANIMATION_SPEED}>
                <div className="box middle-xs center-xs">
                  <br />
                  <Winner {...winner} />
                  <br />
                  <Loser {...loser} />
                </div>
              </FadeIn>
            </div>
          </If>
        </div>
        <br />
        <Wrestlers onClick={onWrestlerClick} style={style} />
      </form>
    </section>
  )
}

CreateAMatch.contextTypes = {
  router: PropTypes.object.isRequired,
}

CreateAMatch.propTypes = {
  buttonText: PropTypes.string,
  currentMatch: PropTypes.object,
  location: PropTypes.object,
  loser: PropTypes.object,
  matches: PropTypes.array,
  onReset: PropTypes.func,
  onSimulateMatch: PropTypes.func,
  onWrestlerClick: PropTypes.func,
  roster: PropTypes.array,
  router: PropTypes.object,
  style: PropTypes.object,
  teams: PropTypes.object,
  winner: PropTypes.object,
}

CreateAMatch.defaultProps = {
  buttonText: "",
  currentMatch: {},
  location: {},
  loser: {},
  matches: [],
  onReset: NOOP,
  onSimulateMatch: NOOP,
  onWrestlerClick: NOOP,
  roster: [],
  router: {},
  style: {},
  teams: {},
  winner: {},
}

export default CreateAMatch
