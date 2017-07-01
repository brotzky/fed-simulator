const page = require("./page")
import React from "react"
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

import { ANIMATION_SPEED } from "../../constants/animation"

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
  componentWillMount() {
    this.props.dispatch(versionActions.checkVersion())
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
    const { shows, style, classnames, children, animations, } = this.props
    const { pathname, } = this.context.router.location

    return (
      <div id="page-container" className="page-container no-select">
        <Notifications />
        <If condition={shows.length > 0}>
          <SlideDown iterations={Number(animations)} duration={ANIMATION_SPEED}>
            <Nav links={headerLinks} style={style} />
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
            <When condition={shows.length > 0}>
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
  shows: PropTypes.array,
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
  style: state.style,
  shows: state.shows,
  version: state.version,
}))(DragDropContext(MultiBackend(HTML5toTouch))(Page))
