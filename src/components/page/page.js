import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import Navigation from "../navigation/navigation"
import ColorPickers from "./color-pickers"
import * as versionActions from "../../actions/version"
// import PerfProfiler from '../perf-profiler/perf-profiler'

import "../../stylesheets/base.scss"
import "./page.scss"

class Page extends React.Component {
  componentWillMount() {
    this.props.dispatch(versionActions.checkVersion())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.version !== this.props.version) {
      this.props.dispatch({
        type: "RESET",
      })
    }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { backgroundColor, color, name, } = this.props.federation

    const navigationItems = [
      {
        url: "name",
        title: "Start All Over Again",
      },
      {
        url: "utils",
        title: "Game Utils",
      },
    ]

    return (
      <main className={`page ${this.props.classNames}`}>
        <If condition={this.props.shows.length > 0}>
          <Navigation />
          <ColorPickers />
        </If>
        <div className="row around-xs center-xs middle-xs">
          <div className={`col-xs-12 start-xs`}>
            <div className="box children">
              {this.props.children}
            </div>
          </div>
        </div>
        <footer className="footer">
          <Navigation navigation={navigationItems} />
        </footer>
      </main>
    )
  }
}

Page.propTypes = {
  classNames: PropTypes.string,
  shows: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  version: PropTypes.number.isRequired,
}

Page.defaultProps = {
  version: 1,
  classNames: "",
}

export default connect(state => ({
  version: state.version,
  federation: state.federation,
  shows: state.shows,
}))(Page)

// <PerfProfiler />
