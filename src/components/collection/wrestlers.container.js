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
    return roster.map(item => {
      x++
      let amount = x + 1
      item.style = shade(amount, style)
      return item
    })
  }

  render() {
    let { style, roster, } = this.props

    return (
      <Collection
        onDelete={this.onDelete}
        onChangeName={this.onChangeName}
        onChangeColor={this.onChangeColor}
        onChangeGender={this.onChangeGender}
        onChangeBackgroundColor={this.onChangeBackgroundColor}
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
  roster: [],
  dispatch: NOOP,
  collection: [],
  style: {},
}

WrestlersContainer.propTypes = {
  roster: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  collection: PropTypes.array,
  style: PropTypes.object,
}

export default connect(state => ({
  roster: state.roster,
  style: state.style,
}))(WrestlersContainer)
