import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      animations: true,
      canPlan: true,
      cash: 0,
      currency: "$",
      currentDate: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      name: "",
      size: "",
      started: false,
    }
  }
}
