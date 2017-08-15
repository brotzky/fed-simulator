import BaseModel from "./base.model"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      started: false,
      canPlan: true,
      name: "",
      size: "",
      cash: 0,
      currency: "$",
      animations: true,
      darkMode: true,
      currentDate: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    }
  }
}
