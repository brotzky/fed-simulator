import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { CHAMPIONSHIP_RESET_CONFIRM } from "../../constants/confirmations"
import { resetChampionships, generateChampionships } from "../../actions/champions"
import Championships from "./championships"

class ManageChampionships extends Component {
  onClear = () => {
    const { dispatch, } = this.props

    if (confirm(CHAMPIONSHIP_RESET_CONFIRM)) {
      dispatch(resetChampionships())
    }
  }

  onGenerate = () => this.props.dispatch(generateChampionships())

  render() {
    return <Championships onGenerate={this.onGenerate} onClear={this.onClear} />
  }
}

ManageChampionships.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect(null)(ManageChampionships)
