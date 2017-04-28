import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateFederation} from '../actions/federation'
import PropTypes from 'prop-types'
import Textarea from '../components/form/textarea.js'

import './stylesheets/name.scss'

class Name extends Component {
  state = {
    name: '',
  }

  componentDidMount() {
    if (this.props.federation.name !== '') {
      this.setState({
        name: this.props.federation.name,
      })
    }
  }

  handleChange = event => {
    this.setState({
      name: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const newState = Object.assign(this.props.federation, this.state)

    this.props.dispatch(updateFederation(newState))
    this.props.router.push('/size')
  }

  displayName = 'Name'

  render() {
    return (
      <section className="page name">
        <h1>Name your federation!</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Textarea
              defaultValue={this.props.federation.name}
              name="name"
              onChange={this.handleChange}
              rows="1"
              label=""
              rows="2"
            />
          </div>
          <button type="submit">
            Save and decide the size of your federation
          </button>
        </form>
      </section>
    )
  }
}

Name.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  federation: state.federation,
}))(Name)
