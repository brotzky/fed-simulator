import React from "react"
import CV from "../cv"
import Video from "../video"

import "./tile.scss"

class PageContainer extends React.Component {
  render() {
    const fedSimVideo = "fedSim.gifv"
    const fedSimLinks = [
      {
        title: "V1",
        url: "http://fedsimulator.com",
      },
      {
        title: "V2 Beta",
        url: "http://beta.fedsimulator.com",
      },
    ]
    return (
      <section>
        <h1>Aaron Lote</h1>
        <div className="row">
          <div className="tile col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <CV />
          </div>
          <div className="tile col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <Video src={fedSimVideo} links={fedSimLinks} />
          </div>
        </div>
        <div className="row">
          <div className="tile col-lg-6 col-md-6 col-sm 12 col-xs-12">
            Weather
          </div>
          <div className="tile col-lg-6 col-md-6 col-sm 12 col-xs-12">BT</div>
        </div>
      </section>
    )
  }
}

PageContainer.displayName = "PageContainer"

export default PageContainer
