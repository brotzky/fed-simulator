import React from 'react'
import PropTypes from 'prop-types'
import Navigation from '../navigation/navigation'
import PerfProfiler from '../perf-profiler/perf-profiler'
import {connect} from 'react-redux'
import * as versionActions from '../../actions/version'
import '../../stylesheets/base.scss'

class Page extends React.Component {
  static propTypes = {
    classNames: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    version: PropTypes.number.isRequired,
  }

  static defaultProps = {
    version: 1,
    classNames: '',
  }

  componentWillMount() {
    this.props.dispatch(versionActions.checkVersion())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.version !== this.props.version) {
      this.props.dispatch({
        type: 'RESET',
      })
    }
  }

  render() {
    return (
      <main className={`page ${this.props.classNames}`}>
        <Navigation />
        <div className="row around-xs center-xs middle-xs">
          <aside className="col-xs-2">
            <div className="box">
              Left
            </div>
          </aside>
          <div className="col-xs-8 start-xs">
            <div className="box">
              {this.props.children}
            </div>
          </div>
          <aside className="col-xs-2 center-xs middle-xs">
            <div className="box">
              Right
            </div>
          </aside>
        </div>
        <PerfProfiler />
      </main>
    )
  }
}

export default connect(state => ({
  version: state.version,
}))(Page)
