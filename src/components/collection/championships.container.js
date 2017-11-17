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

  onChangeWrestler = (championship, event) => {
    const { dispatch, } = this.props
    const wrestlerId = event.currentTarget.value
    const id = championship.id

    dispatch(awardChampionship({ wrestlerId, id, }))
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
    const { style, championships, roster, } = this.props
    return (
      <Collection
        onDelete={this.onDelete}
        onChangeName={this.onChangeName}
        onChangeGender={this.onChangeGender}
        onChangeColor={this.onChangeColor}
        onChangeWrestler={this.onChangeWrestler}
        onChangeBackgroundColor={this.onChangeBackgroundColor}
        canUpdateColors={true}
        canUpdateBrand={false}
        canUpdateGender={true}
        canUpdateWrestler={true}
        canDelete={true}
        canUpdateName={true}
        collection={championships}
        style={style}
        roster={roster}
      />
    )
  }
}

ChampionshipsContainer.propTypes = {
  championships: PropTypes.array,
  collection: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  style: PropTypes.object,
  roster: PropTypes.array,
}

ChampionshipsContainer.defaultProps = {
  championships: [],
  collection: [],
  dispatch: NOOP,
  roster: [],
  style: {},
}

export default connect(state => ({
  championships: state.championships,
  roster: state.roster,
  style: state.style,
}))(ChampionshipsContainer)
