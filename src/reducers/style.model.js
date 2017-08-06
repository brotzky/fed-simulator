import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      unTouched: true,
      backgroundColor: "#291eea",
      color: "#fff",
    }
  }
}
