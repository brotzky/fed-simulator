import React from 'react'
import PropTypes from 'prop-types'
import Navigation from '../navigation/navigation'
// import PerfProfiler from '../perf-profiler/perf-profiler'
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
    const navigationItems = [
      {
        url: 'name',
        title: 'Start All Over Again',
      },
      {
        url: 'utils',
        title: 'Game Utils',
      },
    ]
    return (
      <main className={`page ${this.props.classNames}`}>
        <If condition={this.props.shows.length > 0}>
          <Navigation />
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

export default connect(state => ({
  version: state.version,
  shows: state.shows,
}))(Page)

// <PerfProfiler />
