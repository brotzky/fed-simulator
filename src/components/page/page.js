import React from "react"
import classNames from "classnames"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FadeIn, SlideDown } from "animate-components"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import TouchBackend from "react-dnd-touch-backend"
import MultiBackend, { TouchTransition } from "react-dnd-multi-backend"

import Wrestlers from "../wrestlers/container"
import Notifications from "../notifications/notifications"
import * as versionActions from "../../actions/version"
import Nav from "../nav/nav"
import headerLinks from "./header-links.json"
import burgerLinks from "./burger-links.json"
import {
  ANIMATION_SPEED,
  SHORT_ANIMATION_SPEED
} from "../../constants/animation"

import "../../stylesheets/base.scss"
import "./page.scss"

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
    },
    {
      backend: TouchBackend({ enableMouseEvents: true, }),
      preview: true,
      transition: TouchTransition,
    },
  ],
}

class Page extends React.Component {
  state = {
    openNavBar: false,
  }

  onToggle = () => {
    this.setState({
      openNavBar: !this.state.openNavBar,
    })
  }

  componentWillMount() {
    this.props.dispatch(versionActions.checkVersion())
  }

  componentDidMount() {
    window.scrollTo(0, 0)
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
    const {
      championships,
      style,
      classnames,
      children,
      animations,
      darkMode,
    } = this.props
    const { pathname, } = this.context.router.location
    const topClasses = classNames({ "dark-mode": darkMode, }, [
      "page-container",
      "no-select",
    ])

    return (
      <div id="page-container" className={topClasses}>
        <Notifications />
        <If condition={championships.length > 0}>
          <SlideDown
            style={{ zIndex: 10, }}
            iterations={Number(animations)}
            duration={ANIMATION_SPEED}
          >
            <Nav
              onClickBurger={this.onToggle}
              links={headerLinks}
              style={style}
            />
          </SlideDown>
        </If>
        <If condition={this.state.openNavBar}>
          <SlideDown
            style={{ zIndex: 5, }}
            iterations={Number(animations)}
            duration={SHORT_ANIMATION_SPEED}
          >
            <Nav
              onClickBurger={this.onToggle}
              links={burgerLinks}
              style={style}
            />
          </SlideDown>
        </If>
        <main className={classnames}>
          <FadeIn iterations={Number(animations)} duration={ANIMATION_SPEED}>
            {children}
          </FadeIn>
        </main>
        <FadeIn iterations={Number(animations)} duration={ANIMATION_SPEED}>
          <Choose>
            <When condition={pathname.startsWith("/create-a-match")}>
              <Wrestlers />
            </When>
            <When condition={championships.length > 0}>
              <footer style={style} className="footer nav">
                <a
                  target="_blank"
                  href="https://github.com/azz0r/fed-simulator"
                >
                  <i className="icon fa fa-github" /> Github
                </a>
                <a target="_blank" href="https://twitter.com/universesimman">
                  <i className="icon fa fa-twitter" /> Twitter
                </a>
              </footer>
            </When>
          </Choose>
        </FadeIn>
      </div>
    )
  }
}

Page.displayName = "Page"

Page.propTypes = {
  classnames: PropTypes.string,
  championships: PropTypes.array,
  darkMode: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  version: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  animations: PropTypes.bool.isRequired,
}

Page.defaultProps = {
  version: 1,
  classnames: "",
}

Page.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  animations: state.game.animations,
  darkMode: state.game.darkMode,
  style: state.style,
  championships: state.championships,
  version: state.version,
}))(DragDropContext(MultiBackend(HTML5toTouch))(Page))
