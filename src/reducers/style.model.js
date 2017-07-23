import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      unTouched: true,
      backgroundColor: "#ff6f00",
      color: "#fff",
    }
  }
}
