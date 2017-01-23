import Checkbox from "./checkbox"
import ColourPalettePicker from "../form/colour-palette"
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

    this.props.onSave(
      formData,
    )
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
              {this.props.skeleton.map((item, key) => {
                let type = item.type,
                  values = {
                    name,
                    ref: item.name,
                    label: item.name,
                    defaultValue: item.value,
                    changeHandler: () => {},
                  }
                  return (
                    <div key={key}>
                      <Choose>
                        <When condition={type === "color"}>
                          <ColourPicker {...values} />
                        </When>
                        <When condition={type === "color-palette"}>
                          <ColourPalettePicker {...values} />
                        </When>
                        <When condition={type === "textarea"}>
                          <Textarea {...values} />
                        </When>
                        <When condition={type === "bool"}>
                          <Checkbox {...values} />
                        </When>
                        <When condition={type === "input"}>
                          <Input {...values} />
                        </When>
                        <When condition={type === "readonly"}>
                          <ReadOnly {...values} />
                        </When>
                        <When condition={type === "image"}>
                          <Image {...values} />
                        </When>
                        <When condition={type === "select"}>
                          <Select {...values}
                            options={item.options} />
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
