import React, { Component } from "react"
import { connect } from "react-redux"

import { updateWrestler } from "../../actions/roster"
import ManageRoster from "./manage-roster"

class ManageRosterContainer extends Component {
  state = {
    id: false,
  }

  onWrestlerPointsUpdated = e =>
    this.props.dispatch(
      updateWrestler({ points: Number(e.target.value), id: this.state.id, })
    )
  onWrestlersNameUpdated = e =>
    this.props.dispatch(
      updateWrestler({ name: String(e.target.value), id: this.state.id, })
    )
  onImageUpdated = e =>
    this.props.dispatch(
      updateWrestler({ image: String(e.target.value), id: this.state.id, })
    )

  onWrestlerClick = id => {
    this.setState({
      id,
    })
  }

  render() {
    return (
      <ManageRoster
        currentWrestler={this.props.roster.find(
          wrestler => wrestler.id === this.state.id
        )}
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
