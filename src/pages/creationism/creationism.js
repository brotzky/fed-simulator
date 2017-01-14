import React from "react"
import Helmet from "react-helmet"
import Form from "./form"
import skeleton from "./skeleton"

export default class CreationismPage extends React.Component {

  displayName = "CreationismPage"

  state = {
    currentItem: false,
  }

  changeHandler = (fieldName, fieldValue) => {
    let newState = Object.assign({}, this.state.currentItem)
    newState[fieldName] = fieldValue
    this.setState({
      currentItem: {...newState},
    })
  }

  render() {
    console.log(skeleton)
    return (
      <main className="page creationism">
        <Helmet title="Creationism" />
        <div className="inpage-content">
          <div className="row">
            <div className="col-xs-4">
              <Form skeleton={skeleton.Raw} />
            </div>
            <div className="col-xs-4">
              <Form skeleton={skeleton.Smackdown} />
            </div>
            <div className="col-xs-4">
              <Form skeleton={skeleton.NXT} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}
