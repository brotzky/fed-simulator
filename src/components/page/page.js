import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { FadeIn, SlideDown } from "animate-components"
import HTML5Backend from "react-dnd-html5-backend"
import { DragDropContext } from "react-dnd"

import Wrestlers from "../wrestlers/container"
import Notifications from "../notifications/notifications"
import * as versionActions from "../../actions/version"
import FooterNavigationItems from "./footer.json"
import Navigation from "../navigation/navigation"

import { ANIMATION_SPEED } from "../../constants/animation"

import "../../stylesheets/base.scss"
import "./page.scss"

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
    const { shows, style, classNames, children, animations, } = this.props
    const { pathname, } = this.context.router.location

    return (
      <div className="page-container no-select">
        <Notifications />
        <If condition={shows.length > 0}>
          <SlideDown iterations={Number(animations)} duration={ANIMATION_SPEED}>
            <Navigation style={style} />
          </SlideDown>
        </If>
        <main className={classNames}>
          <FadeIn iterations={Number(animations)} duration={ANIMATION_SPEED}>
            {children}
          </FadeIn>
        </main>
        <FadeIn iterations={Number(animations)} duration={ANIMATION_SPEED}>
          <Choose>
            <When condition={pathname.startsWith("/create-a-match")}>
              <Wrestlers />
            </When>
            <Otherwise>
              <footer style={style} className="footer">
                <Navigation navigation={FooterNavigationItems} />
              </footer>
            </Otherwise>
          </Choose>
        </FadeIn>
      </div>
    )
  }
}

Page.propTypes = {
  classNames: PropTypes.string,
  shows: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  version: PropTypes.number.isRequired,
}

Page.defaultProps = {
  version: 1,
  classNames: "",
}

Page.contextTypes = {
  router: PropTypes.object.isRequired,
}

Page = DragDropContext(HTML5Backend)(Page)

export default connect(state => ({
  animations: state.game.animations,
  federation: state.federation,
  style: state.style,
  shows: state.shows,
  version: state.version,
}))(Page)
