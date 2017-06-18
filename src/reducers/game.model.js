import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      started: false,
      canPlan: true,
      cash: 0,
      currency: "$",
      animations: true,
      currentDate: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    }
  }
}
