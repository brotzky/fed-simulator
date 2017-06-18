import BaseModel from "./base.model"
import groupBy from "lodash.groupby"

export default class extends BaseModel {
  defaults() {
    return {
      id: false,
      rating: 0,
      cost: 0,
      wrestlers: [],
      winner: false,
      loser: false,
      story: [],
    }
  }
  groupWrestlersByTeams() {
    if (this.attributes.wrestlers.length > 0) {
      return groupBy(this.attributes.wrestlers, "teamId")
    } else {
      return []
    }
  }
}
