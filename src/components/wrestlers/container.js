import React, { Component } from "react"
import { connect } from "react-redux"
import classnames from "classnames"
import sortBy from "lodash.sortby"
import PropTypes from "prop-types"
import CloseOnEscape from "react-close-on-escape"

import * as itemType from "../../actions/types"

import Input from "../form/input"
import Wrestler from "./wrestler"

import "./wrestlers.scss"

class WrestlersContainer extends Component {
  state = { nameSearch: "", showFemalesOnly: false, sortByPoints: true, }

  render() {
    const { showFemalesOnly, sortByPoints, nameSearch, } = this.state
    const { style, showFilter, onWrestlerClick, } = this.props
    const sortClasses = classnames("icon", "fa", "fa-sort", {
      active: sortByPoints,
    })
    const genderClasses = classnames("icon", "fa", "fa-venus", {
      active: showFemalesOnly,
    })

    return (
      <div className="wrestlers" style={style}>
        <If condition={showFilter}>
          <div className="row">
            <div className="col-xs-10">
              <div className="box">
                <CloseOnEscape onEscape={this.onEscape}>
                  <Input
                    value={nameSearch}
                    onChange={this.onFilterByName}
                    placeholder="Filter wrestlers by name"
                  />
                </CloseOnEscape>
              </div>
            </div>
            <div className="col-xs-2">
              <div className="box box-filters">
                <i
                  className={sortClasses}
                  aria-hidden="true"
                  onClick={this.onSortByPoints}
                />&nbsp;
                <i
                  className={genderClasses}
                  aria-hidden="true"
                  onClick={this.onToggleWomenWrestlers}
                />&nbsp;
              </div>
            </div>
          </div>
        </If>
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-container">
              <div className="row">
                {this.getRoster(this.props.roster).map(wrestler => {
                  return (
                    <div
                      key={wrestler.id}
                      onClick={() => onWrestlerClick(wrestler.id)}
                      className="col-xs-2 col-sm-2 col-md-1 col-lg-1"
                    >
                      <div className="box">
                        <Wrestler {...wrestler} type={itemType.WRESTLER} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onFilterByName = event => {
    const newState = Object.assign({}, this.state, {
      nameSearch: event.target.value,
    })

    this.setState({ ...newState, })
  }

  onToggleWomenWrestlers = event => {
    event.preventDefault()

    const newState = Object.assign({}, this.state, {
      showFemalesOnly: !this.state.showFemalesOnly,
    })

    this.setState({ ...newState, })
  }

  onSortByPoints = event => {
    event.preventDefault()

    const newState = Object.assign({}, this.state, {
      sortByPoints: !this.state.sortByPoints,
    })

    this.setState({ ...newState, })
  }

  getRoster = roster => {
    let newRoster = Object.assign([], roster)

    if (this.state.nameSearch.length > 1) {
      newRoster = newRoster.filter(wrestler => {
        return (
          wrestler.name
            .toLowerCase()
            .indexOf(this.state.nameSearch.toLowerCase()) > -1
        )
      })
    }

    if (this.state.sortByPoints === true) {
      newRoster = sortBy(newRoster, "points").reverse()
    } else {
      newRoster = sortBy(newRoster, "name")
    }

    if (this.state.showFemalesOnly === true) {
      newRoster = newRoster.filter(wrestler => !wrestler.male)
    }

    return newRoster
  }

  onEscape = () => {
    this.setState({
      nameSearch: "",
    })
  }
}

WrestlersContainer.defaultProps = {
  showFilter: true,
  onWrestlerClick: () => {},
}

WrestlersContainer.propTypes = {
  roster: PropTypes.array.isRequired,
  showFilter: PropTypes.bool,
  style: PropTypes.object.isRequired,
  onWrestlerClick: PropTypes.func,
}

export default connect(state => ({
  style: state.style,
  roster: state.roster,
}))(WrestlersContainer)
