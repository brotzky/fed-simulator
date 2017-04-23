import './stylesheets/branding.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

class RosterPage extends Component {
  displayName = 'RosterPage'

  render() {
    return (
      <section className="page roster">
        <h1>
          Whos on the books?
        </h1>
        <div className="row">
          <div className="col-xs-12 col-lg-6">
            <div className="box">
              <h5>Left</h5>
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            <div className="box">
              <h5>Right</h5>
            </div>
          </div>
        </div>
        <div>
          <button type="submit">
            Update
          </button>
        </div>
      </section>
    )
  }
}

RosterPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  federation: state.federation,
}))(RosterPage)
