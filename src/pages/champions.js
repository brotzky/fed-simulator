import './stylesheets/champions.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateChampions} from '../actions/champions'
import React, {Component} from 'react'
import Textarea from '../components/form/textarea.js'
import GenerateRandom from '../components/generate-random/index'
import faker from 'faker'

const CONFIRM_MESSAGE =
  'Are you sure you want to reset all champions and generate random replacements?'

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
        .join(', '),
      female: this.props.champions
        .filter(champion => !champion.male)
        .map(champion => champion.name)
        .join(', '),
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

  _generateRandomChampions = event => {
    event.preventDefault

    if (confirm(CONFIRM_MESSAGE)) {
      let newState = {}
      let numberOfNames = 3

      Object.keys(this.state).map(key => {
        let newNames = ''
        let x = 0
        while (numberOfNames > x) {
          newNames = `${faker.company.catchPhraseAdjective()}, ${newNames}`
          x++
        }
        newState[key] = newNames
      })
      this.setState({
        ...newState,
      })
    }
  }

  render() {
    return (
      <section className="page champions">
        <h1>
          What
          <span className="gold"> Championship gold </span>
          <br />
          do you have?!
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row top-xs">
            <div className="col-xs-12 col-lg-6">
              <div className="box male">
                <div className="fa fa-mars" />
                <GenerateRandom onClick={this._generateRandomChampions} />
                <Textarea
                  value={this.state.male}
                  name="male"
                  onChange={this.handleChange}
                  placeholder="World Heavyweight Championship, Cruiserweight Championship"
                  label="Mens"
                />
              </div>
            </div>
            <div className="col-xs-12 col-lg-6">
              <div className="box female">
                <div className="fa fa-venus" />
                <Textarea
                  value={this.state.female}
                  name="female"
                  onChange={this.handleChange}
                  placeholder={'Womens World Championship'}
                  label="Womens"
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
  roster: state.roster,
}))(ChampionsPage)
