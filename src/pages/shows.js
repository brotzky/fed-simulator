import './stylesheets/shows.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateShows} from '../actions/shows'
import React, {Component} from 'react'
import defaultShows from './shows.options.json'
import Textarea from '../components/form/textarea.js'

class ChampionsPage extends Component {
  displayName = 'ChampionsPage'

  state = {
    xs: '',
    sm: '',
    md: '',
    lg: '',
  }

  componentWillMount() {
    const filterBySize = size =>
      this.props.shows
        .filter(show => show.size === size)
        .map(champion => champion.name)
        .join(', ')
    this.setState({
      xs: filterBySize('xs'),
      sm: filterBySize('sm'),
      md: filterBySize('md'),
      lg: filterBySize('lg'),
    })
  }

  componentDidMount() {
    if (this.props.roster.length === 0) {
      this.props.router.push('/champions')
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let shows = []

    Object.keys(this.state).forEach(size => {
      let defaultShow = defaultShows.find(show => show.size === size)
      if (defaultShow) {
        let show = {
          size: defaultShow.size,
          frequency: defaultShow.frequency,
          max_attendance: defaultShow.max_attendance,
          max_cost: defaultShow.max_cost,
          max_gross: defaultShow.max_gross,
        }

        let newShow = this.state[size]
          .split(',')
          .filter(String)
          .map(name => Object.assign({name: name.trim(),}, show))

        shows = shows.concat(newShow)
      }
    })
    this.props.dispatch(updateShows(shows))
    this.props.router.push('/ranking')
  }

  render() {
    return (
      <section className="page shows">
        <h1>
          What
          <span className="hot-red"> shows</span>
          &nbsp;do we
          <span className="hot-pink"> produce</span>
          ?
        </h1>
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
                  placeholder={'Raw, Smackdown'}
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
}

ChampionsPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  shows: state.shows,
  roster: state.roster,
}))(ChampionsPage)
