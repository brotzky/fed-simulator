import React, {Component} from 'react'
import {connect} from 'react-redux'
import './stylesheets/calendar'
import {getDateRange} from '../helpers/get-date-range'
import moment from 'moment'

import {YEAR_FORMAT, DATE_FORMAT} from '../constants/calendar'

class CalendarPage extends Component {
  displayName = 'ChampionsPage'

  state = {
    range: [],
  }

  componentDidMount() {
    let from = moment(this.props.federation.current_date).format()
    let to = moment(this.props.federation.current_date).add(7, 'days').format()

    console.log(from)
    console.log(to)

    this.setState({
      range: getDateRange(from, to),
    })
  }

  render() {
    const style = {
      color: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
    }
    return (
      <section className="page calendar">
        <h1>Calendar</h1>
        <h3 style={style}>
          Date: {moment(this.props.federation.current_date).format(YEAR_FORMAT)}
        </h3>
        {this.state.range.map((date, key) => {
          return <div key={key}>{moment(date).format(DATE_FORMAT)}</div>
        })}
      </section>
    )
  }
}

export default connect(state => ({
  shows: state.shows,
  federation: state.federation,
}))(CalendarPage)

// {
//   this.state.range.map(date => {
//     return <div>{date}</div>
//   })
// }
