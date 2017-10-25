import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { updateChampionship, deleteChampionship } from "../../actions/champions"
import Collection from "./collection"

class ChampionshipsContainer extends Component {
  onChangeName = (championship, event) => {
    const { dispatch, } = this.props
    const name = event.currentTarget.value

    championship = Object.assign({}, championship, { name, })

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
    const { collection, style, championships } = this.props
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
        collection={championships}
        style={style}
      />
    )
  }
}

ChampionshipsContainer.propTypes = {
  championships: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  championships: state.championships,
  style: state.style,
}))(ChampionshipsContainer)
