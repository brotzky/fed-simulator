import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { BRANDS_CONFIRM_CLEAR } from "../../constants/confirmations"
import { updateBrand, deleteBrand, resetBrands } from "../../actions/brands"
import ManageBrands from "./manage-brands"

class ManageRosterContainer extends Component {
  state = {
    id: false,
  }

  onChangeName = (brand, event) => {
    const { dispatch, } = this.props
    const name = event.currentTarget.value

    brand = Object.assign({}, brand, { name, })

    dispatch(updateBrand(brand))
  }

  onChangeColor = (brand, color) => {
    const { dispatch, } = this.props

    brand.style.color = color

    dispatch(updateBrand(brand))
  }

  onChangeBackgroundColor = (brand, color) => {
    const { dispatch, } = this.props

    brand.style.backgroundColor = color

    dispatch(updateBrand(brand))
  }

  onDelete = id => {
    // if (confirm(BRAND_CONFIRM_DELETE)) {
    const { dispatch, } = this.props

    this.setState({
      id: false,
    })
    dispatch(deleteBrand(id))
    // }
  }

  onClear = () => {
    const { dispatch, } = this.props

    if (confirm(BRANDS_CONFIRM_CLEAR)) {
      dispatch(resetBrands())
    }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { brands, } = this.props
    return (
      <ManageBrands
        brands={brands}
        onDelete={this.onDelete}
        onClear={this.onClear}
        onChangeName={this.onChangeName}
        onChangeColor={this.onChangeColor}
        onChangeBackgroundColor={this.onChangeBackgroundColor}
      />
    )
  }
}

ManageRosterContainer.propTypes = {
  brands: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  brands: state.brands,
}))(ManageRosterContainer)
