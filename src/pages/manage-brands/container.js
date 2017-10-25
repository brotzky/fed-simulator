import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { BRANDS_CONFIRM_CLEAR } from "../../constants/confirmations"
import { resetBrands } from "../../actions/brands"
import ManageBrands from "./manage-brands"

class ManageRosterContainer extends Component {
  onClear = () => {
    const { dispatch, } = this.props

    if (confirm(BRANDS_CONFIRM_CLEAR)) {
      dispatch(resetBrands())
    }
  }

  render() {
    return (
      <ManageBrands onClear={this.onClear} />
    )
  }
}

ManageRosterContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect(null)(ManageRosterContainer)
