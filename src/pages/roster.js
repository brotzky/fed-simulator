import './stylesheets/roster.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateRoster} from '../actions/roster'
import React, {Component} from 'react'
import pointsToRandomValue from '../helpers/points-to-random-value'
const noop = () => {}

const RosterSection = ({
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
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </div>
      </div>
    </div>
  )
}

class RosterPage extends Component {
  displayName = 'RosterPage'

  state = {
    'male-commentators': '',
    'male-lowercard': '',
    'male-midcard': '',
    'male-mainevent': '',
    'female-commentators': '',
    'female-lowercard': '',
    'female-midcard': '',
    'female-mainevent': '',
  }

  componentWillMount() {
    const filterByMinMax = (male = true, min = 0, max = 100) =>
      this.props.roster
        .filter(
          wrestler =>
            wrestler.male === male &&
            wrestler.points >= min &&
            wrestler.points <= max
        )
        .map(wrestler => wrestler.name)
        .join(', ')
    this.setState({
      'male-commentators': filterByMinMax(true, 0, 30),
      'male-lowercard': filterByMinMax(true, 30, 60),
      'male-midcard': filterByMinMax(true, 60, 80),
      'male-mainevent': filterByMinMax(true, 80, 100),
      'female-commentators': filterByMinMax(false, 0, 30),
      'female-lowercard': filterByMinMax(false, 30, 60),
      'female-midcard': filterByMinMax(false, 60, 80),
      'female-mainevent': filterByMinMax(false, 80, 100),
    })
  }

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
        wins: 0,
        losses: 0,
      }

      let newWrestlers = this.state[stateKey]
        .split(',')
        .map(name =>
          Object.assign({name, points: pointsToRandomValue(points),}, wrestler)
        )

      wrestlers = wrestlers.concat(newWrestlers)
    })
    this.props.dispatch(updateRoster(wrestlers))
    this.props.router.push('/champions')
  }

  render() {
    return (
      <section className="page roster">
        <h1>
          Whos on the 📖?
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row top-xs">
            <div className="col-xs-12 col-lg-6">
              <div className="box">
                <div className="fa fa-mars" />
                <RosterSection
                  section={'Mens Main event'}
                  name="male-mainevent"
                  onChange={this.handleChange}
                  defaultValue={this.state['male-mainevent']}
                />
                <RosterSection
                  section={'Mid card'}
                  name="male-midcard"
                  onChange={this.handleChange}
                  defaultValue={this.state['male-midcard']}
                />
                <RosterSection
                  section={'Lower card'}
                  name="male-lowercard"
                  onChange={this.handleChange}
                  defaultValue={this.state['male-lowercard']}
                />
                <RosterSection
                  section={'Jobbers'}
                  name="male-jobbers"
                  onChange={this.handleChange}
                  defaultValue={this.state['male-jobbers']}
                />
                <RosterSection
                  section={'Commentators'}
                  name="male-commentators"
                  onChange={this.handleChange}
                  defaultValue={this.state['male-commentators']}
                />
              </div>
            </div>
            <div className="col-xs-12 col-lg-6">
              <div className="box">
                <div className="fa fa-venus" />
                <RosterSection
                  section={'Womens Main Event'}
                  name="female-mainevent"
                  onChange={this.handleChange}
                  defaultValue={this.state['female-mainevent']}
                />
                <RosterSection
                  section={'Mid card'}
                  name="female-midcard"
                  onChange={this.handleChange}
                  defaultValue={this.state['female-midcard']}
                />
                <RosterSection
                  section={'Lower card'}
                  name="female-lowercard"
                  onChange={this.handleChange}
                  defaultValue={this.state['female-lowercard']}
                />
                <RosterSection
                  section={'Jobbers'}
                  name="female-jobbers"
                  onChange={this.handleChange}
                  defaultValue={this.state['female-jobbers']}
                />
                <RosterSection
                  section={'Commentators'}
                  name="female-commentators"
                  onChange={this.handleChange}
                  defaultValue={this.state['female-commentators']}
                />
              </div>
            </div>
          </div>
          <div>
            <button type="submit">
              Update the books and get some gold
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
  roster: state.roster,
}))(RosterPage)

// Gender icons by Icon Geek; https://thenounproject.com/icongeek/collection/gender/?oq=gender&cidx=0&i=801870
