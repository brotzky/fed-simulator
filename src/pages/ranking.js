import './stylesheets/ranking.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import orderBy from 'lodash/orderBy'

const RankingCollection = ({wrestlers = [],}) => {
  wrestlers = orderBy(wrestlers, 'points', 'desc')
  return (
    <ul className="ranking">
      {wrestlers.map(wrestler => {
        return (
          <li key={wrestler.name} className="ranking__wrestler">
            {wrestler.name}
            {' '}
            <span className="ranking__points">
              (
              {wrestler.points}
              {' '}
              points,
              {' '}
              {wrestler.losses}
              {' '}
              losses,
              {' '}
              {wrestler.wins}
              {' '}
              wins)
            </span>
          </li>
        )
      })}
    </ul>
  )
}

class RankingPage extends Component {
  displayName = 'RankingPage'

  render() {
    const maleWrestlers = this.props.roster.filter(wrestler => wrestler.male)
    const femaleWrestlers = this.props.roster.filter(wrestler => !wrestler.male)
    return (
      <section className="page ranking">
        <h1>Ranking</h1>
        <div className="row top-xs">
          <div className="col-xs-12 col-lg-6">
            <div className="box">
              <RankingCollection wrestlers={maleWrestlers} />
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            <div className="box">
              <RankingCollection wrestlers={femaleWrestlers} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

RankingPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  roster: state.roster,
}))(RankingPage)
