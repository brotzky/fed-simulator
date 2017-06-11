import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      unTouched: true,
      backgroundColor: "#000",
      color: "#fff",
    }
  }
}
