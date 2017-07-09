import * as itemType from "../actions/types"

import moment from "moment"

export default function getAcceptedSizes(date) {
  let accepts = [itemType["xs"], itemType["sm"], itemType["md"],]
  const day = moment(date).day()

  if (day === 0) {
    accepts = [itemType["lg"], itemType["md"],]
  } else if (day > 0 && day < 6) {
    accepts = [itemType["sm"], itemType["xs"],]
  } else {
    accepts = [itemType["md"],]
  }
  return accepts
}
