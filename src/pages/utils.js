import React, {Component} from 'react'
import './stylesheets/utils'

class Utils extends Component {
  state = {
    stage: 'start',
  }
  _onClearStorage = () => {
    this.setState({
      stage: 'complete',
    })

    localStorage.clear()

    setTimeout(() => {
      this.setState({
        stage: 'start',
      })
    }, 3000)
  }

  render() {
    return (
      <section className={`page utils ${this.state.stage}`}>
        <h1>Utils</h1>
        <p>
          <a onClick={this._onClearStorage}>Clear Local Storage</a>
        </p>
      </section>
    )
  }
}

export default Utils
