import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import PerfProfiler from "../perf-profiler/perf-profiler"
import { connect } from "react-redux"
import * as versionActions from "../../actions/version"
import "../../stylesheets/base.scss"

class Page extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    version: PropTypes.number.isRequired,
  }

  static defaultProps = {
    version: 1,
  }

  componentWillMount() {
    this.props.dispatch(
      versionActions.checkVersion()
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.version !== this.props.version) {
      this.props.dispatch({
        type: "RESET",
      })
    }
  }

  render() {
    return (
      <div>
        <If condition={process && process.env && process.env.NODE_ENV === "development"}>
          <PerfProfiler />
        </If>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}


export default connect(state => ({
  version: state.version,
}))(Page)
