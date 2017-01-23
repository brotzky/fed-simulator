import Checkbox from "./checkbox"
import ColourPicker from "./colour"
import Image from "./image"
import Input from "./input"
import React from "react"
import ReadOnly from "./readonly"
import Select from "./select"
import Textarea from "./textarea"

export default class Form extends React.Component {

  displayName = "Form"

  state = {
    currentItem: false,
    saved: false,
  }

  onSave = (event) => {
    event.preventDefault()

    const formData = {}

    for (let field in this.refs) {
      formData[field] = this.refs[field].state.value
    }

    this.props.onSave(formData)
    this.setState({
      saved: true,
    })
  }

  render() {

    return (
      <article className="form">
        <form>
          <Choose>
            <When condition={this.state.saved}>
              <h3>Form Saved</h3>
            </When>
            <Otherwise>
              {Object.keys(this.props.skeleton).map((name, key) => {
                let defaultValue = this.props.skeleton[name].value,
                  currentFieldtype = this.props.skeleton[name].type,
                  values = {
                    name,
                    ref: name,
                    label: name,
                    defaultValue,
                    changeHandler: () => {},
                  }
                  return (
                    <div key={key}>
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
                        <When condition={currentFieldtype === "image"}>
                          <Image {...values} />
                        </When>
                        <Otherwise>
                          &nbsp;
                        </Otherwise>
                      </Choose>
                    </div>
                  )
                })}
              <div>
                <button
                  label="Save"
                  className="btn bg-green"
                  onClick={this.onSave}>
                  <i className="fa fa-save"></i> Create
                </button>
              </div>
            </Otherwise>
          </Choose>
        </form>
      </article>
    )
  }
}
