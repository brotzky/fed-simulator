import './stylesheets/roster.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateRoster} from '../actions/roster'
import React, {Component} from 'react'
import pointsToRandomValue from '../helpers/points-to-random-value'
const noop = () => {}

const RosterSection = ({section, name, rows = 3, onChange = noop,}) => {
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
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}

class RosterPage extends Component {
  displayName = 'RosterPage'

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let wrestlers = []

    Object.keys(this.state).forEach(stateKey => {
      let stateSplit = stateKey.split('-')
      let male = stateSplit[0] === 'male'
      let points = stateSplit[1]

      let wrestler = {
        male,
      }

      let newWrestlers = this.state[stateKey]
        .split(',')
        .map(name =>
          Object.assign({name, points: pointsToRandomValue(points),}, wrestler)
        )

      wrestlers = wrestlers.concat(newWrestlers)
    })
    this.props.dispatch(updateRoster(wrestlers))
  }

  render() {
    return (
      <section className="page roster">
        <h1>
          Whos on the books?
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row top-xs">
            <div className="col-xs-12 col-lg-6">
              <div className="box">
                <div className="fa fa-mars" />
                <RosterSection
                  section={'Men Top Tier'}
                  name="male-mainevent"
                  onChange={this.handleChange}
                />
                <RosterSection
                  section={'Mid card'}
                  name="male-midcard"
                  onChange={this.handleChange}
                />
                <RosterSection
                  section={'Lower card'}
                  name="male-lowercard"
                  onChange={this.handleChange}
                />
                <RosterSection
                  section={'Jobbers'}
                  name="male-jobber"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col-xs-12 col-lg-6">
              <div className="box">
                <div className="fa fa-venus" />
                <RosterSection
                  section={'Female Top Tier'}
                  name="female-mainevent"
                  onChange={this.handleChange}
                />
                <RosterSection
                  section={'Mid card'}
                  name="female-midcard"
                  onChange={this.handleChange}
                />
                <RosterSection
                  section={'Lower card'}
                  name="female-lowercard"
                  onChange={this.handleChange}
                />
                <RosterSection
                  section={'Jobbers'}
                  name="female-jobber"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <button type="submit">
              Update the books and open the calendar
            </button>
          </div>
        </form>
      </section>
    )
  }
}

RosterPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  federation: state.federation,
}))(RosterPage)

// Gender icons by Icon Geek; https://thenounproject.com/icongeek/collection/gender/?oq=gender&cidx=0&i=801870
