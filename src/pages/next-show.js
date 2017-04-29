import React, {Component} from 'react'
import {connect} from 'react-redux'

class NextShow extends Component {
  render() {
    return (
      <section className="page next-show">
        <h1>
          Next show
        </h1>
        <div className="row top-xs">
          <div className="col-xs-12 col-lg-6">
            <div className="box">
              <h2>
                Roster
              </h2>
              <ul>
                {this.props.roster.map(wrestler => {
                  return (
                    <li key={wrestler.name}>
                      {wrestler.name}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default connect(state => ({
  roster: state.roster,
}))(NextShow)
