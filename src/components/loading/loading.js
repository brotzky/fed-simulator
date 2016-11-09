import React from "react"
import "./stylesheets/loading"

export default class Head extends React.Component {

  displayName = "Loading"

  render() {
    return (
      <div className="loading text-center">
        <img
          src="static/media/loading.gif"
          alt="Loading..."
          title="Loading..."
        />
      </div>
    )
  }
}
