import { connect } from "react-redux"
import PropTypes from "prop-types"
import React, { Component } from "react"
import Helmet from "react-helmet"

import { SHOWS_CONFIRM_GENERATE } from "../constants/confirmations"
import { updateShows } from "../actions/shows"
import defaultShows from "../constants/shows.options.json"
import GenerateRandom from "../components/generate-random"
import Textarea from "../components/form/textarea.js"
import constantDefaults from "../constants/defaults.json"
import HeaderOne from "../components/h1/h1"

import "./stylesheets/shows.scss"

class ChampionsPage extends Component {
  displayName = "ChampionsPage"

  state = {
    xs: "",
    sm: "",
    md: "",
    lg: "",
  }

  componentWillMount() {
    const filterBySize = size =>
      this.props.shows
        .filter(show => show.size === size)
        .map(champion => champion.name)
        .join(", ")
    this.setState({
      xs: filterBySize("xs"),
      sm: filterBySize("sm"),
      md: filterBySize("md"),
      lg: filterBySize("lg"),
    })
  }

  render() {
    return (
      <section className="page shows">
        <Helmet title="Shows" />
        <HeaderOne>
          What
          <span className="cyan"> shows</span>
          &nbsp;do we&nbsp;
          <span className="hot-pink"> produce</span>
          ?
          {" "}
          <GenerateRandom onClick={this._generateDefaultShows} />
        </HeaderOne>
        <form onSubmit={this.handleSubmit}>
          <div className="row top-xs">
            <div className="col-xs-12">
              <div className="box">
                <Textarea
                  value={this.state.lg}
                  name="lg"
                  onChange={this.handleChange}
                  placeholder="Wrestlemania, Summerslam"
                  rows="1"
                  label="Big Four"
                  rows="2"
                />
                <Textarea
                  value={this.state.md}
                  name="md"
                  onChange={this.handleChange}
                  placeholder="Backlash, Payback"
                  label="Monthy PPV"
                  rows="2"
                />
                <Textarea
                  value={this.state.sm}
                  name="sm"
                  onChange={this.handleChange}
                  placeholder={"Raw, Smackdown"}
                  label="Weekly TV"
                  rows="2"
                />
                <Textarea
                  value={this.state.xs}
                  name="xs"
                  onChange={this.handleChange}
                  placeholder="Light tube Smash, Backyard Killers"
                  label="Gym Show, House Show, Back Garden"
                  rows="2"
                />
              </div>
            </div>
            <div />
            <button type="submit">
              Save to disk and move on!
            </button>
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
    let shows = []

    const { dispatch, router, } = this.props

    Object.keys(this.state).forEach(size => {
      let defaultShow = defaultShows.find(show => show.size === size)
      if (defaultShow) {
        let newShow = this.state[size]
          .split(",")
          .filter(name => name.length > 2)
          .filter(String)
          .map(name => {
            return {
              name: name.trim(),
              size: defaultShow.size,
              frequency: defaultShow.frequency,
            }
          })

        shows = shows.concat(newShow)
      }
    })
    dispatch(updateShows(shows))
    router.push("/default")
  }

  _generateDefaultShows = event => {
    event.preventDefault

    if (confirm(SHOWS_CONFIRM_GENERATE)) {
      this.setState({
        ...constantDefaults.shows,
      })
    }
  }
}

ChampionsPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  shows: state.shows,
  championships: state.championships,
  roster: state.roster,
}))(ChampionsPage)
