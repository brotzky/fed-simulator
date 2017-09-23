import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import ManageRoster from "./manage-roster"

class ManageRosterContainer extends Component {
  state = {
    id: false,
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
    const { roster, style, } = this.props
    const currentWrestler = roster.find(wrestler => wrestler.id === this.state.id)

    return <ManageRoster currentWrestler={currentWrestler} onWrestlerClick={this.onWrestlerClick} style={style} />
  }
}

ManageRosterContainer.propTypes = {
  roster: PropTypes.array.isRequired,
  style: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(state => ({
  roster: state.roster,
  style: state.style,
}))(ManageRosterContainer)
