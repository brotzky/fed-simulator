import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { updateChampionship, deleteChampionship, awardChampionship } from "../../actions/champions"
import Collection from "./collection"

const NOOP = () => {}

class ChampionshipsContainer extends Component {
  onChangeName = (championship, event) => {
    const { dispatch, } = this.props
    const name = event.currentTarget.value

    championship = Object.assign({}, championship, { name, })

    dispatch(updateChampionship(championship))
  }

  onChangeGender = championship => {
    const { dispatch, } = this.props
    const male = !championship.male

    championship = Object.assign({}, championship, { male, })

    dispatch(updateChampionship(championship))
  }

  onChangeBrand = (championship, event) => {
    const { dispatch, } = this.props
    const brandId = event.currentTarget.value
    const id = championship.id

    dispatch(updateChampionship({ brandId, id, }))
  }

  onChangeColor = (championship, color) => {
    const { dispatch, } = this.props

    championship.style.color = color

    dispatch(updateChampionship(championship))
  }

  onChangeBackgroundColor = (championship, color) => {
    const { dispatch, } = this.props

    championship.style.backgroundColor = color

    dispatch(updateChampionship(championship))
  }

  onDelete = id => {
    const { dispatch, } = this.props

    this.setState({
      id: false,
    })
    dispatch(deleteChampionship(id))
  }

  render() {
    const { style, championships, roster, brandId, brands, } = this.props
    return (
      <Collection
        onDelete={this.onDelete}
        onChangeName={this.onChangeName}
        onChangeGender={this.onChangeGender}
        onChangeColor={this.onChangeColor}
        onChangeBrand={this.onChangeBrand}
        onChangeBackgroundColor={this.onChangeBackgroundColor}
        canUpdateColors={true}
        canUpdateBrand={true}
        canUpdateGender={true}
        canUpdateWrestler={false}
        canDelete={true}
        canUpdateName={true}
        collection={championships}
        style={style}
        roster={roster}
        brandId={brandId}
        brands={brands}
      />
    )
  }
}

ChampionshipsContainer.propTypes = {
  brandId: PropTypes.string,
  brands: PropTypes.array,
  championships: PropTypes.array,
  collection: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  roster: PropTypes.array,
  style: PropTypes.object,
}

ChampionshipsContainer.defaultProps = {
  brandId: "",
  brands: [],
  championships: [],
  collection: [],
  dispatch: NOOP,
  roster: [],
  style: {},
}

export default connect(state => ({
  brands: state.federation.brands,
  championships: state.federation.championships,
  roster: state.federation.roster,
  style: state.style,
}))(ChampionshipsContainer)
