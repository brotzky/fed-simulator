import React from "react"
import Header from "./header"
import Footer from "./footer"
import PerfProfiler from "../perf-profiler/perf-profiler"
import { connect } from "react-redux"
import * as versionActions from "../../actions/version"
import "../../stylesheets/base"

class Page extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    version: React.PropTypes.number.isRequired,
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
