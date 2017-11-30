import React from "react"
import PropTypes from "prop-types"

import Wrestlers from "../../components/wrestlers/container"
import { Winner, Loser } from "../../components/winner/winner"
import HeaderOne from "../../components/header/header"
import Match from "../../components/match/container"
import Button from "../../components/button/button"
import { Reset } from "../../components/icons"

import "./create-a-match.scss"

const NOOP = () => {}

const CreateAMatch = ({
  currentMatch = {},
  loser = {},
  onReset = NOOP,
  onSimulateMatch = NOOP,
  onWrestlerClick = NOOP,
  style = {},
  winner = {},
  numberOfWrestlers = 0,
}) => (
  <section className="page create-a-match">
    <form onSubmit={onSimulateMatch}>
      <div className="row">
        <div className="col-xs-12">
          <div className="box">
            <HeaderOne>
              Create a Match
              <span tabIndex="0" className="tools">
                <Reset onClick={onReset} />
              </span>
            </HeaderOne>
            <Match currentMatch={currentMatch} />
            <If condition={winner.name && loser.name}>
              <div className="col-xs-12">
                <div className="box middle-xs center-xs">
                  <Winner {...winner} />
                  <br />
                  <Loser {...loser} />
                </div>
              </div>
            </If>
            <If condition={numberOfWrestlers > 1}>
              <br />
              <Button tabIndex="0" value="Simulate Match" onClick={onSimulateMatch} />
            </If>
          </div>
        </div>
      </div>
      <Wrestlers onClick={onWrestlerClick} style={style} />
    </form>
  </section>
)

CreateAMatch.propTypes = {
  currentMatch: PropTypes.object,
  loser: PropTypes.object,
  onReset: PropTypes.func,
  onSimulateMatch: PropTypes.func,
  onWrestlerClick: PropTypes.func,
  style: PropTypes.object,
  winner: PropTypes.object,
  numberOfWrestlers: PropTypes.number,
}

export default CreateAMatch
