import React from "react"
import classNames from "classnames"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FadeIn } from "animate-components"

import * as versionActions from "../../actions/version"
import Nav from "../nav/nav"
import burgerLinks from "./links.json"
import { ANIMATION_SPEED } from "../../constants/animation"

import "../../stylesheets/base.scss"
import "./page.scss"

class Page extends React.Component {
  state = {
    openNavBar: true,
  }

  componentWillMount() {
    this.props.dispatch(versionActions.checkVersion())
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.version !== this.props.version) {
      nextProps.dispatch({
        type: "RESET",
      })
    }
  }

  render() {
    const { openNavBar, } = this.state
    const { children, classnames, style, championships, } = this.props
    const { location: { pathname, }, } = this.props
    const topClasses = classNames(classnames, ["page-container", "no-select",])
    const mainClasses = { backgroundColor: style.darkBgColor, }
    const activeUrl = pathname.replace(/^\//, "")
    const isNavVisible = championships.length > 0 && openNavBar

    return (
      <div id="page-container" style={style} className={topClasses}>
        <main style={mainClasses}>
          <If condition={isNavVisible}>
            <aside>
              <Nav activeUrl={activeUrl} links={burgerLinks} {...style} modifier="main" />
            </aside>
          </If>
          <article>
            <FadeIn duration={ANIMATION_SPEED}>
              {children}
            </FadeIn>
          </article>
        </main>
      </div>
    )
  }
}

Page.displayName = "Page"

Page.propTypes = {
  championships: PropTypes.array,
  children: PropTypes.object.isRequired,
  classnames: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
  style: PropTypes.object.isRequired,
  version: PropTypes.number.isRequired,
}

Page.defaultProps = {
  classnames: "",
  version: 1,
}

Page.contextTypes = {
  location: PropTypes.object,
}

export default connect(state => ({
  championships: state.championships,
  style: state.style,
  version: state.version,
}))(Page)
