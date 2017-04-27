import './stylesheets/branding.scss'
import {connect} from 'react-redux'
import {updateFederation} from '../actions/federation'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {SwatchesPicker} from 'react-color'

class BrandingPage extends Component {
  state = {
    backgroundColor: '',
    color: '',
    currentTitle: 'What colours represent you?? 🏳️',
  }

  componentDidMount() {
    if (this.props.federation.backgroundColor !== '') {
      this.setState({
        backgroundColor: this.props.federation.backgroundColor,
        color: this.props.federation.color,
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const newState = Object.assign(this.props.federation, this.state)

    this.props.dispatch(updateFederation(newState))
    this.props.router.push('/roster')
  }

  handeBackgroundColorChange = color => {
    this.setState({backgroundColor: color.hex,})
  }

  handleColorChange = color => {
    this.setState({color: color.hex,})
  }

  onClickTitle = () => {
    this.setState({
      currentTitle: this.props.federation.name,
    })
  }

  displayName = 'BrandingPage'

  render() {
    const style = {
      backgroundColor: this.state.backgroundColor,
      color: this.state.color,
    }
    return (
      <section className="page branding">
        <h1
          className="col-xs-12 skew-forward"
          style={style}
          onClick={this.onClickTitle}
        >
          {this.state.currentTitle}
        </h1>
        <div className="row colours">
          <div className="col-xs-12 col-lg-6 center-xs middle-xs">
            <div className="box">
              <h5>Background</h5>
              <SwatchesPicker onChange={this.handeBackgroundColorChange} />
            </div>
          </div>
          <div className="col-xs-12 col-lg-6 center-xs middle-xs right">
            <div className="box">
              <h5>Font</h5>
              <SwatchesPicker onChange={this.handleColorChange} />
            </div>
          </div>
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
