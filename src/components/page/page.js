import React from 'react'
import PropTypes from 'prop-types'
import Navigation from '../navigation/navigation'
import PerfProfiler from '../perf-profiler/perf-profiler'
import {connect} from 'react-redux'
import * as versionActions from '../../actions/version'
import '../../stylesheets/base.scss'
import './page.scss'

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
    const hasSidebar =
      this.props.federation.name !== '' && this.props.federation.size !== ''
    const mainWidth = hasSidebar ? 'col-lg-8' : 'col-lg-10'
    return (
      <main className={`page ${this.props.classNames}`}>
        <Navigation />
        <div className="row around-xs center-xs middle-xs">
          <div className={`col-xs-12 ${mainWidth} start-xs`}>
            <div className="box children">
              {this.props.children}
            </div>
          </div>
          <If condition={hasSidebar}>
            <aside className="col-xs-12 col-lg-4 center-xs middle-xs">
              <div className="box">
                Right
              </div>
            </aside>
          </If>
        </div>
        <PerfProfiler />
      </main>
    )
  }
}

export default connect(state => ({
  version: state.version,
  federation: state.federation,
}))(Page)
