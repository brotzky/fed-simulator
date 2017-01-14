import Checkbox from "../../components/form/checkbox"
import Textarea from "../../components/form/textarea"
import ColourPicker from "../../components/form/colour"
import Input from "../../components/form/input"
import React from "react"
import ReadOnly from "../../components/form/readonly"
import Select from "../../components/form/select"

export default class Form extends React.Component {

  displayName = "Form"

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
    return (
      <article className="form">
        {Object.keys(this.props.skeleton).map((name, key) => {
          let defaultValue = this.props.skeleton[name].value,
            currentFieldtype = this.props.skeleton[name].type,
            values = {
              name,
              defaultValue,
              changeHandler: this.changeHandler,
            }
            return (
              <div key={key}>
                <label htmlFor={name}>{name}</label>
                <Choose>
                  <When condition={currentFieldtype === "colour"}>
                    <ColourPicker {...values} />
                  </When>
                  <When condition={currentFieldtype === "textarea"}>
                    <Textarea {...values} />
                  </When>
                  <When condition={currentFieldtype === "bool"}>
                    <Checkbox {...values} />
                  </When>
                  <When condition={currentFieldtype === "input"}>
                    <Input {...values} />
                  </When>
                  <When condition={currentFieldtype === "readonly"}>
                    <ReadOnly {...values} />
                  </When>
                  <Otherwise>
                    &nbsp;
                  </Otherwise>
                </Choose>
              </div>
            )
          })}
      </article>
    )
  }
}
