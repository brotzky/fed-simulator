import React from "react"
import Helmet from "react-helmet"

import Wrestlers from "../components/wrestlers/container"
import Input from "../components/form/input"
import HeaderOne from "../components/h1/h1"

import "./stylesheets/update-wrestlers.scss"

const UpdateWrestlersPage = () => {
  const style = {
    backgroundColor: "orange",
    color: "white",
  }
  const avatar = {
    backgroundImage:
      "url(data:image/png;base64,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)",
  }
  return (
    <div className="page update-wrestlers">
      <Helmet title="Update the Wrestlers!" />
      <HeaderOne>Update the Wrestlers!</HeaderOne>
      <div className="row">
        <div className="col-xs-12">
          <p>Click to select</p>
          <Wrestlers showFilter={false} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Name</td>
                <td>Points</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Input value={"Name"} />
                </td>
                <td>
                  <Input value={"75"} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row center-xs middle-xs dropzone">
        <div className="col-xs-12">
          <div className="box">
            <h3>Drop Image Here</h3>
            <img className="avatar" style={avatar} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateWrestlersPage
