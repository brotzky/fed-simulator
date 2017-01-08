import "./stylesheets/segments"
import React from "react"

export default class Segments extends React.Component {

  static propTypes = {
    segments: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      textColour: React.PropTypes.string.isRequired,
      bgColour: React.PropTypes.string.isRequired,
      percent: React.PropTypes.number,
      value: React.PropTypes.number,
    }))
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
            <span key={key}
              style={style}
              className="segments__segment hvr-bounce-to-right truncate">
              {segment.name} &nbsp;
              {segment.value.toLocaleString()}
            </span>
          )
        })}
      </div>
    )
  }
}
