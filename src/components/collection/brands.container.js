import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { updateBrand, deleteBrand } from "../../actions/brands"
import Collection from "./collection"

const NOOP = () => {}

class BrandsContainer extends Component {
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
    const { dispatch, } = this.props

    this.setState({
      id: false,
    })
    dispatch(deleteBrand(id))
  }

  render() {
    const { style, brands, } = this.props
    return (
      <Collection
        onDelete={this.onDelete}
        onChangeName={this.onChangeName}
        onChangeColor={this.onChangeColor}
        onChangeBackgroundColor={this.onChangeBackgroundColor}
        canUpdateColors={true}
        canUpdateBrand={false}
        canUpdateGender={false}
        canDelete={true}
        canUpdateName={true}
        collection={brands}
        style={style}
        tabIndex="0"
      />
    )
  }
}

BrandsContainer.defaultProps = {
  brands: [],
  dispatch: NOOP,
  collection: [],
  style: {},
}

BrandsContainer.propTypes = {
  brands: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  collection: PropTypes.array,
  style: PropTypes.object,
}

export default connect(state => ({
  brands: state.brands,
  style: state.style,
}))(BrandsContainer)
