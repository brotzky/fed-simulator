import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { updateChampionship, deleteChampionship } from "../../actions/champions"
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
    const { style, championships, } = this.props
    return (
      <Collection
        onDelete={this.onDelete}
        onChangeName={this.onChangeName}
        onChangeGender={this.onChangeGender}
        onChangeColor={this.onChangeColor}
        onChangeBackgroundColor={this.onChangeBackgroundColor}
        canUpdateColors={true}
        canUpdateBrand={false}
        canUpdateGender={true}
        canDelete={true}
        canUpdateName={true}
        collection={championships}
        style={style}
      />
    )
  }
}

ChampionshipsContainer.propTypes = {
  championships: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  collection: PropTypes.array,
  style: PropTypes.object,
}

ChampionshipsContainer.defaultProps = {
  championships: [],
  dispatch: NOOP,
  collection: [],
  style: {},
}

export default connect(state => ({
  championships: state.championships,
  style: state.style,
}))(ChampionshipsContainer)
