import React, { Component } from "react"
import { connect } from "react-redux"

import { updateWrestler } from "../../actions/roster"
import ManageRoster from "./manage-roster"

class ManageRosterContainer extends Component {
  onWrestlerPointsUpdated = points => {
    let wrestler = this.getCurrentWrestler()
    wrestler.points = points

    this.props.dispatch(updateWrestler(wrestler))
  }
  onWrestlersNameUpdated = () => {}
  onImageUpdated = () => {}
  onWrestlerClick = id => {
    this.setState({
      id,
    })
  }
  state = {
    id: false,
  }

  getCurrentWrestler = () => {
    const { roster, } = this.props

    return roster.find(wrestler => wrestler.id === this.state.id)
  }

  render() {
    const currentWrestler = this.getCurrentWrestler()
    return (
      <ManageRoster
        currentWrestler={currentWrestler}
        onWrestlerPointsUpdated={this.onWrestlerPointsUpdated}
        onWrestlersNameUpdated={this.onWrestlersNameUpdated}
        onImageUpdated={this.onImageUpdated}
        onWrestlerClick={this.onWrestlerClick}
      />
    )
  }
}

export default connect(state => ({
  roster: state.roster,
}))(ManageRosterContainer)
