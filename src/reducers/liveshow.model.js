import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      canPlan: false,
      cost: 0,
      date: Date(),
      gross: 0,
      name: "",
      rating: 0,
      showId: false,
      size: "xs",
    }
  }
}
