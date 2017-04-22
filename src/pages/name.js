import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateFederation} from '../actions/federation'

class Name extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
    }
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.props.dispatch(
      updateFederation({
        name: this.state.value,
      })
    )
  }

  displayName = 'Name'

  render() {
    return (
      <section className="page name">
        <h1>Federation Name</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </section>
    )
  }
}

export default connect(state => ({
  federation: state.federation,
}))(Name)
