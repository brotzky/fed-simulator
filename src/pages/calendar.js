import React, {Component} from 'react'
import {connect} from 'react-redux'
import './stylesheets/calendar'
import {getDateRange} from '../helpers/get-date-range'
import moment from 'moment'

import {YEAR_FORMAT, DATE_FORMAT} from '../constants/calendar'

const DEFAULT_SHOWS = []

class CalendarPage extends Component {
  displayName = 'ChampionsPage'

  state = {
    rangeOfDates: [],
    showsForTheWeek: [],
  }

  componentDidMount() {
    const {shows, federation,} = this.props

    let from = moment(federation.current_date).format()
    let to = moment(federation.current_date).add(7, 'days').format()
    let dateNumber = moment(federation.current_date).format('MM')
    let rangeOfDates = getDateRange(from, to)

    let weeklyShows = shows.filter(show => show.frequency === 'weekly')
    let dailyShows = shows.filter(show => show.frequency === 'daily')
    let monthlyShows = dateNumber > 25
      ? shows.filter(show => show.frequency === 'monthly')
      : DEFAULT_SHOWS

    let showsForTheWeek = []
      .concat(dailyShows.slice(0, 2))
      .concat(weeklyShows.slice(0, 2))
      .concat(monthlyShows.slice(0, 1))

    this.setState({
      rangeOfDates,
      showsForTheWeek,
    })
  }

  _fetchRandomShow = () => {
    const length = this.state.showsForTheWeek.length
    const showKey = [Math.floor(Math.random() * length),]

    return this.state.showsForTheWeek[showKey]
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
        {this.state.rangeOfDates.map((date, key) => {
          let show = this._fetchRandomShow(this.state.showsForTheWeek)
          return (
            <div key={key}>
              {moment(date.date).format(DATE_FORMAT)}
              <If condition={show}>
                : {show.name}
              </If>
            </div>
          )
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
