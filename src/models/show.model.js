import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      frequency: "weekly",
      name: "Default",
      size: "xs",
    }
  }
}
