import { connect } from "react-redux"
import PropTypes from "prop-types"
import React, { Component } from "react"

import { SHOWS_CONFIRM_GENERATE } from "../constants/confirmations"
import { updateShows, generateShows } from "../actions/shows"
import defaultShows from "../constants/shows.options.json"
import GenerateRandom from "../components/generate-random"
import Textarea from "../components/form/textarea"
import Button from "../components/button/button"
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
    const { shows, } = this.props
    const filterBySize = size =>
      shows
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
        <HeaderOne>
          What
          <span className="cyan"> shows</span>
          &nbsp;do we&nbsp;
          <span className="hot-pink"> produce</span>
          ? <GenerateRandom onClick={this._generateDefaultShows} />
        </HeaderOne>
        <br />
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
                <Button
                  onClick={this.handleSubmit}
                  type="submit"
                  value="Save to disk and move on!"
                />
              </div>
            </div>
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
    this.redirect()
  }

  _generateDefaultShows = event => {
    event.preventDefault

    if (confirm(SHOWS_CONFIRM_GENERATE)) {
      this.props.dispatch(generateShows())
      this.redirect()
    }
  }

  redirect = () => {
    this.props.router.push("/default")
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
