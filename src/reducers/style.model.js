import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      unTouched: true,
      backgroundColor: "#ddbd16",
      darkBackgroundColor: "#000",
      color: "#fff",
      shade: -60,
    }
  }
}
