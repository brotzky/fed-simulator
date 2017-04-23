import './stylesheets/size.scss'
import {connect} from 'react-redux'
import classNames from 'classNames'
import {updateFederation} from '../actions/federation'
import defaultOptions from './size.options.json'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import acronymLongName from '../helpers/acronym-long-name'

class SizePage extends Component {
  state = {
    size: defaultOptions.find(size => size.default).size,
  }

  componentDidMount() {
    if (this.props.federation.size !== '') {
      this.setState({
        size: this.props.federation.size,
      })
    }
  }

  handleChange = size => {
    this.setState({
      size,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const newState = Object.assign(this.props.federation, this.state)

    this.props.dispatch(updateFederation(newState))
    this.props.router.push('/branding')
  }

  displayName = 'Size'

  render() {
    return (
      <section className="page size">
        <h1>
          How big are you `{acronymLongName(this.props.federation.name)}`?!
        </h1>
        <div className="row sizes">
          {defaultOptions.map(option => {
            const classes = classNames('col-xs-3', 'size', 'cursor-pointer', {
              active: option.size === this.state.size,
            })
            return (
              <div
                className={classes}
                key={option.id}
                onClick={() => this.handleChange(option.size)}
              >
                <h3>{option.name}</h3>
                <p>{option.size}</p>
              </div>
            )
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            Save and brand your federation!
          </button>
        </form>
      </section>
    )
  }
}

SizePage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  federation: state.federation,
}))(SizePage)

// Bingohall by Creative Stall from the Noun Project; https://thenounproject.com/search/?i=145426
// Garden by Star and Anchor Design; https://thenounproject.com/search/?i=566413
// Gymnasium by Ismael Ruiz; https://thenounproject.com/search/?i=684754
