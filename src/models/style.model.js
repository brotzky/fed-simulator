import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      unTouched: true,
      backgroundColor: "#3e029f",
      darkBackgroundColor: "#000",
      color: "#fff",
      shade: -60,
    }
  }
}
