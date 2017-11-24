import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import chromatism from "chromatism"

import { updateWrestler, deleteWrestler } from "../../actions/roster"
import Collection from "./collection"

const NOOP = () => {}
const shade = (amount, style) => {
  return {
    color: style.color,
    backgroundColor: chromatism.hue(amount, style.backgroundColor).hex,
  }
}

class WrestlersContainer extends Component {
  onChangeName = (wrestler, event) => {
    const { dispatch, } = this.props
    const name = event.currentTarget.value

    wrestler = Object.assign({}, wrestler, { name, })

    dispatch(updateWrestler(wrestler))
  }

  onChangeBrand = (wrestler, event) => {
    const { dispatch, } = this.props
    const brandId = event.currentTarget.value

    wrestler = Object.assign({}, wrestler, { brandId, })

    dispatch(updateWrestler(wrestler))
  }

  onChangeGender = wrestler => {
    const { dispatch, } = this.props
    const male = !wrestler.male

    wrestler = Object.assign({}, wrestler, { male, })

    dispatch(updateWrestler(wrestler))
  }

  onDelete = id => {
    const { dispatch, } = this.props

    this.setState({
      id: false,
    })
    dispatch(deleteWrestler(id))
  }

  clean = (roster, style) => {
    let x = 0
    return (roster = roster.map(item => {
      x++
      let amount = x + 1
      item.style = shade(amount, style)
      return item
    }))
  }

  render() {
    let { style, roster, brands, } = this.props

    return (
      <Collection
        onDelete={this.onDelete}
        onChangeName={this.onChangeName}
        onChangeColor={this.onChangeColor}
        onChangeGender={this.onChangeGender}
        onChangeBackgroundColor={this.onChangeBackgroundColor}
        onChangeBrand={this.onChangeBrand}
        brands={brands}
        canUpdateColors={false}
        canUpdateBrand={true}
        canUpdateGender={true}
        canDelete={true}
        canUpdateName={true}
        collection={this.clean(roster, style)}
        tabIndex="0"
      />
    )
  }
}

WrestlersContainer.defaultProps = {
  brands: [],
  collection: [],
  dispatch: NOOP,
  roster: [],
  style: {},
}

WrestlersContainer.propTypes = {
  brands: PropTypes.array,
  collection: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  roster: PropTypes.array,
  style: PropTypes.object,
}

export default connect(state => ({
  brands: state.federation.brands,
  roster: state.federation.roster,
  style: state.style,
}))(WrestlersContainer)
