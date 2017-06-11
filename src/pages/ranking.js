import { connect } from "react-redux"
import orderBy from "lodash/orderBy"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { SlideRight, SlideLeft } from "animate-components"

import Ranking from "../components/ranking/ranking"

import "./stylesheets/ranking.scss"

const COLUMNS = ["rank", "name", "points", "wins", "losses",]

class RankingPage extends Component {
  displayName = "RankingPage"

  componentDidMount() {
    if (this.props.shows.length === 0) {
      this.props.router.push("/shows")
    }
  }

  render() {
    const wrestlers = orderBy(this.props.roster, "points", "desc")
    const maleWrestlers = wrestlers.filter(wrestler => wrestler.male)
    const femaleWrestlers = wrestlers.filter(wrestler => !wrestler.male)
    return (
      <section className="page ranking">
        <h1>
          <span className="gold pop">🌟 Winners </span>
          <span>&nbsp; and &nbsp;</span>
          <span className="gray push"> 🗑 Losers</span>
        </h1>
        <div className="row top-xs">

          <div className="col-xs-12 col-sm-12 col-md 6 col-lg-6">
            <div className="box">
              <If condition={maleWrestlers.length > 0}>
                <SlideLeft duration="500ms">
                  <Ranking
                    title="Male Wrestlers"
                    rows={maleWrestlers}
                    columns={COLUMNS}
                  />
                </SlideLeft>
              </If>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md 6 col-lg-6">
            <div className="box">
              <If condition={femaleWrestlers.length > 0}>
                <SlideRight duration="500ms">
                  <Ranking
                    title="Female Wrestlers"
                    rows={femaleWrestlers}
                    columns={COLUMNS}
                  />
                </SlideRight>
              </If>
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
  shows: state.shows,
}))(RankingPage)
