import React, { Component } from "react"
import { connect } from "react-redux"
import classNames from "classNames"
import sortBy from "lodash.sortby"

import * as itemType from "../../actions/types"
import Input from "../form/input"
import Wrestler from "./wrestler"

import "./wrestlers.scss"

class WrestlersContainer extends Component {
  state = { nameSearch: "", showFemalesOnly: false, sortByPoints: false, }

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

  componentWillMount() {
    this.roster = Object.assign([], this.props.roster)
  }

  componentWillUpdate(nextProps, nextState) {
    let newRoster = Object.assign([], this.props.roster)

    if (nextState.nameSearch.length > 1) {
      newRoster = newRoster.filter(wrestler => {
        return (
          wrestler.name
            .toLowerCase()
            .indexOf(nextState.nameSearch.toLowerCase()) > -1
        )
      })
    }

    if (nextState.sortByPoints === true) {
      newRoster = sortBy(newRoster, "points").reverse()
    } else {
      newRoster = sortBy(newRoster, "name")
    }

    if (nextState.showFemalesOnly === true) {
      newRoster = newRoster.filter(wrestler => !wrestler.male)
    }

    this.roster = newRoster
  }

  render() {
    const sortClasses = classNames("fa fa-sort", {
      active: this.state.sortByPoints,
    })
    const genderClasses = classNames("fa fa-venus", {
      active: this.state.showFemalesOnly,
    })

    return (
      <div className="wrestlers" style={this.props.style}>
        <div className="row">
          <div className="col-lg-1 col-xs-12">
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
          <div className="col-lg-10 col-xs-12">
            <div className="box">
              <Input
                value={this.state.nameSearch}
                onChange={this.onFilterByName}
                placeholder="Filter wrestlers by name"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="box box-container">
              <div className="row">
                {this.roster.map(wrestler => {
                  return (
                    <div
                      key={wrestler.id}
                      className="col-xs-3 col-sm-2 col-md-2 col-lg-1"
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
}

export default connect(state => ({
  federation: state.federation,
  style: state.style,
  roster: state.roster,
}))(WrestlersContainer)
