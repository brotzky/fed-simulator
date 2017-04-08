import "./stylesheets/segments.scss"
import React from "react"
import PropTypes from "prop-types"

export default class Segments extends React.Component {

  static propTypes = {
    segments: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      textColour: PropTypes.string.isRequired,
      bgColour: PropTypes.string.isRequired,
      percent: PropTypes.number,
      value: PropTypes.number,
    })),
  }

  static defaultProps = {
    segments: [],
  }

  displayName = "Segments"

  render() {
    return (
      <div className="segments">
        {this.props.segments.map((segment, key) => {
          let style = {
            width: `${segment.percent}%`,
            backgroundColor: segment.bgColour,
            color: segment.textColour,
          }
          return (
            <div key={key}
              style={style}
              className="segments__segment hvr-bounce-to-right truncate">
              <span className="segments__name">{segment.name} &nbsp;
              {segment.value.toLocaleString()}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
}
