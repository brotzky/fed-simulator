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

  static propTypes = {
    onSave: React.PropTypes.func,
  }

  static defaultProps = {
    onSave: () => {},
  }

  displayName = "Form"

  state = {
    saved: false,
  }

  onSave = (event) => {
    event && event.preventDefault()

    const formData = {}

    for (let field in this.refs) {
      formData[field] = this.refs[field].state.value
    }

    this.props.onSave(
      formData,
    )
  }

  render() {
    return (
      <article className="form">
        <form>
          {this.props.skeleton.map((item, key) => {
            let type = item.type,
              values = {
                name: item.name,
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
              <i className="fa fa-save"></i> {this.props.buttonTitle}
            </button>
          </div>
        </form>
      </article>
    )
  }
}
