import React from "react"
import "./stylesheets/segments"

export default class Segments extends React.Component {

  static propTypes = {
    segments: React.PropTypes.array,
  }

  static contextTypes = {
    toSlug: React.PropTypes.func.isRequired,
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
          }
          return (
            <span key={key}
              style={style}
              className={`segments__segment segments__segment--${this.context.toSlug(segment.name)} zoom truncate`}>
              {segment.name} ({segment.value})
            </span>
          )
        })}
      </div>
    )
  }
}
