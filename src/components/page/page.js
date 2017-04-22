import React from 'react'
import PropTypes from 'prop-types'
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
      <section className={`page ${this.props.classNames}`}>
        <PerfProfiler />
        <div className="row around-xs">
          <div className="col-xs-2">
            <div className="box">
              Side
            </div>
          </div>
          <div className="col-xs-2">
            <div className="box">
              {this.props.children}
            </div>
          </div>
          <div className="col-xs-2">
            <div className="box">
              Side
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default connect(state => ({
  version: state.version,
}))(Page)
