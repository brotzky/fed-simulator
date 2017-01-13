import React from "react"
import { Link } from "react-router"
import Head from "../head/head"
import { connect } from "react-redux"
import * as versionActions from "../../actions/version"
import navigation from "./navigation"
import logo from "./logo.png"
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
        <div className="content">
          <header className="header">
            <div className="navigation navigation--primary">
              <ul className="navigation__list">
                {navigation.map((navigationItem, key) => {
                  return (
                    <li key={key} className="navigation__item">
                      <Link
                        to={navigationItem.url}>
                        {navigationItem.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </header>
          <div>{this.props.children}</div>
        </div>
        <footer className="footer">
          <p>
            All WWE imagery is taken from <a rel="noopener" href="http://www.wwe.com/main-help/generalfaq/copyright" target="_blank">WWE.com</a> and owned by <a rel="noopener" href="https://wwe.com" target="_blank">World Wrestling Entertainment, Inc.</a>
          </p>
          <p>
            Please <a href="mailto:aaron.lote@gmail.com">email me</a> directly with any queries or find me on twitter <a target="_blank" rel="noopener" href="https://twitter.com/azz0r">@azz0r</a> or <a target="_blank" rel="noopener" href="https://twitter.com/UniverseSimMan">@UniverseSimMan</a>
          </p>
        </footer>
      </div>
    )
  }
}


export default connect(state => ({
  version: state.version,
}))(Page)
