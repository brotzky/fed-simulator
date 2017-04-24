import './stylesheets/shows.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateShows} from '../actions/shows'
import React, {Component} from 'react'
const noop = () => {}
import defaultShows from './shows.options.json'

const ShowSection = ({
  section,
  name,
  rows = 3,
  onChange = noop,
  placeholder = '',
  defaultValue = '',
}) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <label htmlFor={name}>
            {section}
          </label>
          <textarea
            id={name}
            type="text"
            rows={rows}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}

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
          {' '}
          <span className="gold">shows</span>
          {' '}
          do we
          {' '}
          <span className="blue">produce</span>
          ?
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row top-xs">
            <div className="col-xs-12">
              <div className="box">
                <ShowSection
                  section={'Big Four'}
                  name="lg"
                  onChange={this.handleChange}
                  placeholder={'Wrestlemania, Summerslam'}
                  defaultValue={this.state.lg}
                />
                <ShowSection
                  section={'Monthy PPV'}
                  name="md"
                  onChange={this.handleChange}
                  placeholder={'Backlash, Payback'}
                  defaultValue={this.state.md}
                />
                <ShowSection
                  section={'Weekly TV'}
                  name="sm"
                  onChange={this.handleChange}
                  placeholder={'Raw, Smackdown'}
                  defaultValue={this.state.sm}
                />
                <ShowSection
                  section={'Gym Show, House Show, Back Garden'}
                  name="xs"
                  onChange={this.handleChange}
                  placeholder={'Light tube Smash, Backyard Killers'}
                  defaultValue={this.state.xs}
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
}))(ChampionsPage)
