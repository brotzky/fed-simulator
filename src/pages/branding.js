import './stylesheets/branding.scss'
import {connect} from 'react-redux'
import {updateFederation} from '../actions/federation'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

class BrandingPage extends Component {
  state = {
    backgroundColor: '',
    color: '',
  }

  componentDidMount() {
    if (this.props.federation.backgroundColor !== '') {
      this.setState({
        backgroundColor: this.props.federation.backgroundColor,
        color: this.props.federation.color,
      })
    }
  }

  // handleChange = size => {
  //   this.setState({
  //     backgroundColor: this.state.backgroun,
  //   })
  // }

  handleSubmit = event => {
    event.preventDefault()
    const newState = Object.assign(this.props.federation, this.state)

    this.props.dispatch(updateFederation(newState))
    this.props.router.push('/roster')
  }

  displayName = 'Size'

  render() {
    return (
      <section className="page branding">
        <h1>
          What colours represent you???
        </h1>
        <div className="row colours">
          <h4>Background Colour</h4>
          Swatch
        </div>
        <div className="row colours">
          <h4>Font Colour</h4>
          Swatch
        </div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            Paint Save and build your dream roster
          </button>
        </form>
      </section>
    )
  }
}

BrandingPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  federation: state.federation,
}))(BrandingPage)
