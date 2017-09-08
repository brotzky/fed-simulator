import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      backgroundColor: "#3e029f",
      color: "#fff",
      darkBackgroundColor: "#000",
      shade: -60,
      unTouched: true,
    }
  }
}
