import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { BRANDS_CONFIRM_CLEAR } from "../../constants/confirmations"
import { resetBrands, generateBrands } from "../../actions/brands"
import BrandsPage from "./brands"

class BrandsContainer extends Component {
  onClear = () => {
    const { dispatch, } = this.props

    if (confirm(BRANDS_CONFIRM_CLEAR)) {
      dispatch(resetBrands())
    }
  }

  onGenerate = () => this.props.dispatch(generateBrands())

  render() {
    return <BrandsPage onGenerate={this.onGenerate} onClear={this.onClear} />
  }
}

BrandsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect(null)(BrandsContainer)
