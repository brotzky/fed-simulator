import './stylesheets/ranking.scss'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import orderBy from 'lodash/orderBy'
import Ranking from '../components/ranking/ranking'

const RankingCollection = ({title = '', wrestlers = [],}) => {
  wrestlers = orderBy(wrestlers, 'points', 'desc')
  return <Ranking title={title} wrestlers={wrestlers} />
}

class RankingPage extends Component {
  displayName = 'RankingPage'

  render() {
    const maleWrestlers = this.props.roster.filter(wrestler => wrestler.male)
    const femaleWrestlers = this.props.roster.filter(wrestler => !wrestler.male)
    return (
      <section className="page ranking">
        <h1>
          <span className="gold">🌟 Winners </span> and
          <span className="gray"> 🗑 Losers</span>
        </h1>
        <div className="row top-xs">
          <div className="col-xs-12 col-lg-6">
            <div className="box">
              <RankingCollection
                title={'Male Wrestlers'}
                wrestlers={maleWrestlers}
              />
            </div>
          </div>
          <div className="col-xs-12 col-lg-6">
            <div className="box">
              <RankingCollection
                title={'Female Wrestlers'}
                wrestlers={femaleWrestlers}
              />
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
