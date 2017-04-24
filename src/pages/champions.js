import './stylesheets/champions.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateChampions} from '../actions/champions'
import React, {Component} from 'react'
const noop = () => {}

const ChampionshipSection = ({
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
    male: '',
    female: '',
  }

  componentWillMount() {
    this.setState({
      male: this.props.champions
        .filter(champion => champion.male)
        .map(champion => champion.name)
        .join(),
      female: this.props.champions
        .filter(champion => !champion.male)
        .map(champion => champion.name)
        .join(),
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let championships = []

    Object.keys(this.state).forEach(stateKey => {
      let male = stateKey === 'male'

      let champion = {
        male,
        current_champion: '',
        losses: 0,
      }

      let newChampionship = this.state[stateKey]
        .split(',')
        .map(name => Object.assign({name: name.trim(),}, champion))

      championships = championships.concat(newChampionship)
    })
    this.props.dispatch(updateChampions(championships))
    this.props.router.push('/shows')
  }

  render() {
    return (
      <section className="page champions">
        <h1>
          What Championship gold <br /> do you have?!
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row top-xs">
            <div className="col-xs-12 col-lg-6">
              <div className="box">
                <div className="fa fa-mars" />
                <ChampionshipSection
                  section={'Mens'}
                  name="male"
                  onChange={this.handleChange}
                  placeholder={
                    'World Heavyweight Championship, Cruiserweight Championship'
                  }
                  defaultValue={this.state.male}
                />
              </div>
            </div>
            <div className="col-xs-12 col-lg-6">
              <div className="box">
                <div className="fa fa-venus" />
                <ChampionshipSection
                  section={'Womens'}
                  name="female"
                  onChange={this.handleChange}
                  placeholder={'Womens World Championship'}
                  defaultValue={this.state.female}
                />
              </div>
            </div>
          </div>
          <div>
            <button type="submit">
              Press that gold and move on!
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
  champions: state.champions,
}))(ChampionsPage)
