import React, {Component} from 'react'
import {connect} from 'react-redux'
import './stylesheets/calendar'

class CalendarPage extends Component {
  displayName = 'ChampionsPage'

  render() {
    return (
      <section className="page calendar">
        <h1>Calendar</h1>
        <ul>
          {this.props.shows.map((show, key) => {
            return (
              <li key={key}>
                {show.name}
                :
                {' '}
                {show.frequency}
                :
                {' '}
                {show.size}
                :
                {' '}
                {show.max_cost}
                :
                {' '}
                {show.max_gross}
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default connect(state => ({
  shows: state.shows,
}))(CalendarPage)
