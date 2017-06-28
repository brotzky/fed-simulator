import React from "react"

class PageContainer extends React.Component {
  render() {
    return (
      <section>
        <h1>Aaron Lote</h1>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm 12 col-xs-12">CV</div>
          <div className="col-lg-6 col-md-6 col-sm 12 col-xs-12">
            Fed Simulator
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm 12 col-xs-12">Weather</div>
          <div className="col-lg-6 col-md-6 col-sm 12 col-xs-12">BT</div>
        </div>
      </section>
    )
  }
}

PageContainer.displayName = "PageContainer"

export default PageContainer
