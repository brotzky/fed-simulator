import React from "react"
import { Link } from "react-router"
import Head from "../head/head"
import CreatorWarning from "../creator/warning"
import { connect } from "react-redux"
import * as versionActions from "../../actions/version"
import navigation from "./navigation"
import logo from "./logo.png"
import "../../stylesheets/base"

class Page extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    version: React.PropTypes.number.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    ppvs: React.PropTypes.array.isRequired,
    shows: React.PropTypes.array.isRequired,
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
          <Choose>
            <When condition={this.props.shows.length === 0 || this.props.ppvs.length === 0 || this.props.wrestlers.length === 0}>
              <CreatorWarning />
            </When>
          </Choose>
          <div>{this.props.children}</div>
        </div>
        <footer className="footer">
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
  wrestlers: state.wrestlers,
  shows: state.shows,
  ppvs: state.ppvs,
}))(Page)
