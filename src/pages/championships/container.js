import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { resetChampionships } from "../../actions/champions"
import Championships from "./championships"

class ManageChampionships extends Component {
  onClear = () => this.props.dispatch(resetChampionships())

  render() {
    return (
      <Championships onClear={this.onClear} />
    )
  }
}

ManageChampionships.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect(null)(ManageChampionships)
