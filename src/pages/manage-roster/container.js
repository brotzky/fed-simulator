import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { WRESTLER_CONFIRM_DELETE } from "../../constants/confirmations"
import { updateWrestler, removeWrestler } from "../../actions/roster"
import ManageRoster from "./manage-roster"

class ManageRosterContainer extends Component {
  state = {
    id: false,
  }

  onBrandClick = id => this.props.dispatch(updateWrestler({ brandId: String(id), id: this.state.id, }))

  onWrestlerPointsUpdated = e => this.props.dispatch(updateWrestler({ points: Number(e.target.value), id: this.state.id, }))

  onWrestlersNameUpdated = e => this.props.dispatch(updateWrestler({ name: String(e.target.value), id: this.state.id, }))

  onImageUpdated = (name, value) => {
    this.props.dispatch(updateWrestler({ image: String(value), id: this.state.id, }))
  }

  onWrestlerDelete = () => {
    if (confirm(WRESTLER_CONFIRM_DELETE)) {
      const { id, } = this.state
      const { dispatch, } = this.props

      this.setState({
        id: false,
      })
      dispatch(removeWrestler(id))
    }
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
    const { roster, animations, brands, style, } = this.props
    return (
      <ManageRoster
        animations={animations}
        brands={brands}
        currentWrestler={roster.find(wrestler => wrestler.id === this.state.id)}
        onBrandClick={this.onBrandClick}
        onImageUpdated={this.onImageUpdated}
        onWrestlerClick={this.onWrestlerClick}
        onWrestlerDelete={this.onWrestlerDelete}
        onWrestlerPointsUpdated={this.onWrestlerPointsUpdated}
        onWrestlersNameUpdated={this.onWrestlersNameUpdated}
        style={style}
      />
    )
  }
}

ManageRosterContainer.propTypes = {
  animations: PropTypes.bool.isRequired,
  brands: PropTypes.array.isRequired,
  roster: PropTypes.array.isRequired,
  style: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(state => ({
  animations: state.game.animations,
  brands: state.brands,
  roster: state.roster,
  style: state.style,
}))(ManageRosterContainer)
