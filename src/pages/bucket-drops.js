import React, { Component } from "react"
import BucketDrops from "../components/bucket-drops/bucket-drops"
import Helmet from "react-helmet"

export default class PageBucketDrops extends Component {

  displayName="PageBucketDrops"

  render() {
    return (
      <div>
        <Helmet title="Bucket Drops" />
        <header>
          <h1>
            <img
              src="/static/media/wwe.png"
              alt="WWE"
              title="WWE"
            />
            <span> Draft Generator</span>
          </h1>
        </header>
        <hr />
        <BucketDrops />
        <hr />
      </div>
    )
  }
}
