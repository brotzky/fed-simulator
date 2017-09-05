import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      name: false,
      style: {
        backgroundColor: "black",
        color: "white",
      },
    }
  }
}
