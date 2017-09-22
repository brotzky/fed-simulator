import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { updateRoster, generateRoster } from "../actions/roster"
import Textarea from "../components/form/textarea.js"
import GenerateRandom from "../components/generate-random"
import { ROSTER_CONFIRM_RESET } from "../constants/confirmations"
import HeaderOne from "../components/h1/h1"
import Button from "../components/button/button"

import "./stylesheets/roster.scss"

class RosterPage extends Component {
  displayName = "RosterPage"

  state = {
    "male-lowercard": "",
    "male-midcard": "",
    "male-mainevent": "",
    "female-lowercard": "",
    "female-midcard": "",
    "female-mainevent": "",
  }

  componentWillMount() {
    const { roster, } = this.props
    const filterByMinMax = (male = true, min = 0, max = 100) =>
      roster.filter(wrestler => wrestler.male === male && wrestler.points >= min && wrestler.points <= max).map(wrestler => wrestler.name).join()
    this.setState({
      "male-lowercard": filterByMinMax(true, 0, 40),
      "male-midcard": filterByMinMax(true, 40, 80),
      "male-mainevent": filterByMinMax(true, 80, 100),
      "female-lowercard": filterByMinMax(false, 0, 40),
      "female-midcard": filterByMinMax(false, 40, 80),
      "female-mainevent": filterByMinMax(false, 80, 100),
    })
  }

  render() {
    return (
      <section className="page roster">
        <HeaderOne className="sparkle">
          <span className="hang">🌚 Dream</span> Roster?&nbsp;
          <GenerateRandom onClick={this._generateDefaultRoster} />
        </HeaderOne>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-xs-12 col-lg-6">
              <div className="box male">
                <i className="icon fa fa-mars" />
                <Textarea value={this.state["male-mainevent"]} name="male-mainevent" onChange={this.handleChange} label="Mens Main event" />
                <Textarea value={this.state["male-midcard"]} name="male-midcard" onChange={this.handleChange} label="Mid card" />
                <Textarea value={this.state["male-lowercard"]} name="male-lowercard" onChange={this.handleChange} label="Lower card" />
              </div>
            </div>
            <div className="col-xs-12 col-lg-6">
              <div className="box female">
                <i className="icon fa fa-venus" />
                <Textarea value={this.state["female-mainevent"]} name="female-mainevent" onChange={this.handleChange} label="Womens Main Event" />
                <Textarea value={this.state["female-midcard"]} name="female-midcard" onChange={this.handleChange} label="Mid card" />
                <Textarea value={this.state["female-lowercard"]} name="female-lowercard" onChange={this.handleChange} label="Lower card" />
              </div>
            </div>
          </div>
          <div>
            <Button value="Update the books" onClick={this.handleSubmit} type="submit" />
          </div>
        </form>
      </section>
    )
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    let wrestlers = []

    const { dispatch, router, } = this.props

    Object.keys(this.state).forEach(stateKey => {
      const stateSplit = stateKey.split("-")
      const male = stateSplit[0] === "male"
      const rawPoints = stateSplit[1]

      let newWrestlers = this.state[stateKey].split(",").filter(name => name.length > 2).filter(String).map(name => {
        const points = pointsToRandomValue(rawPoints)
        const cost = points * 150
        return {
          name,
          male,
          points,
          cost,
        }
      })

      wrestlers = wrestlers.concat(newWrestlers)
    })
    dispatch(updateRoster(wrestlers))
    router.push("/default")
  }

  _generateDefaultRoster = event => {
    event.preventDefault

    if (confirm(ROSTER_CONFIRM_RESET)) {
      this.props.dispatch(generateRoster())
      this.redirect()
    }
  }

  redirect = () => {
    this.props.router.push("/default")
  }
}

RosterPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  roster: state.roster,
}))(RosterPage)

// Gender icons by Icon Geek; https://thenounproject.com/icongeek/collection/gender/?oq=gender&cidx=0&i=801870
