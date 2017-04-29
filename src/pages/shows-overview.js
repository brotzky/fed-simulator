import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import './stylesheets/shows-overview.scss'
import shuffle from 'shuffle-array'
import {getRandomHex} from '../helpers/get-random-hex'

class ShowsOverview extends React.Component {
  static propTypes = {
    onPPVClick: PropTypes.func,
    shows: PropTypes.array.isRequired,
  }

  static defaultProps = {
    onPPVClick: () => {},
  }

  displayName = 'ShowsOverview'

  render() {
    return (
      <div className="ppvs">
        <ul className="ppvs__list">
          {shuffle(this.props.shows).map(ppv => {
            const style = {
              color: getRandomHex(),
            }
            return (
              <li key={ppv.name} style={style} className="ppvs__item pulse">
                {ppv.name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default connect(state => ({
  shows: state.shows,
}))(ShowsOverview)
