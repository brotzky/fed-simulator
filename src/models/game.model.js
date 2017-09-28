import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      animations: true,
      name: "",
      started: false,
    }
  }
}
