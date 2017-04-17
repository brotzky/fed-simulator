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

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    })
  }

  handleSubmit = (event) => {
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
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default connect(state => ({
  federation: state.federation,
}))(Name)
