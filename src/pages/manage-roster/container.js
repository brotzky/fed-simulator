import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { updateWrestler, removeWrestler } from "../../actions/roster"
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

  onImageUpdated = (name, value) => {
    this.props.dispatch(
      updateWrestler({ image: String(value), id: this.state.id, })
    )
  }

  onWrestlerDelete = () => {
    const { id, } = this.state
    const { dispatch, } = this.props

    this.setState({
      id: false,
    })
    dispatch(removeWrestler(id))
  }

  onWrestlerClick = id => {
    this.setState({
      id,
    })
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { roster, } = this.props
    return (
      <ManageRoster
        currentWrestler={roster.find(wrestler => wrestler.id === this.state.id)}
        onWrestlerPointsUpdated={this.onWrestlerPointsUpdated}
        onWrestlersNameUpdated={this.onWrestlersNameUpdated}
        onImageUpdated={this.onImageUpdated}
        onWrestlerClick={this.onWrestlerClick}
        onWrestlerDelete={this.onWrestlerDelete}
      />
    )
  }
}

ManageRosterContainer.propTypes = {
  roster: PropTypes.array.isRequired,
}

export default connect(state => ({
  roster: state.roster,
}))(ManageRosterContainer)
