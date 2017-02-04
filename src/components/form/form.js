import Checkbox from "./checkbox"
import ColourPalettePicker from "../form/colour-palette"
import ColourPicker from "./colour"
import Image from "./image"
import Input from "./input"
import React from "react"
import ReadOnly from "./readonly"
import Select from "./select"
import Textarea from "./textarea"
import "./stylesheets/form"

export default class Form extends React.Component {

  static propTypes = {
    buttonTitle: React.PropTypes.string,
    id: React.PropTypes.string,
    onSave: React.PropTypes.func,
    skeleton: React.PropTypes.array.isRequired,
  }

  static defaultProps = {
    buttonTitle: "Save",
    id: Math.random(),
    onSave: () => {},
    skeleton: [],
  }

  displayName = "Form"

  state = {
    saved: false,
  }

  onSave = (event) => {
    event && event.preventDefault()

    const formData = {}

    for (const field in this.refs) {
      if (this.refs.hasOwnProperty(field)) {
        formData[field] = this.refs[field].state.value
      }
    }

    this.props.onSave(
      formData,
    )
  }

  render() {
    return (
      <article>
        <form className="form"
          id={this.props.id}>
          {this.props.skeleton.map((item, key) => {
            let type = item.type,
              values = {
                name: item.name,
                ref: item.name,
                label: item.label ? item.label : item.name,
                defaultValue: item.value,
                changeHandler: () => {},
              }
              return (
                <div className="form__group"
                  key={key}>
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
              <i className="fa fa-save"></i> {this.props.buttonTitle}
            </button>
          </div>
        </form>
      </article>
    )
  }
}
