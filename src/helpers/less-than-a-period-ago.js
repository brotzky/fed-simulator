import moment from "moment"

export default function lessThanAPeriodAgo(periodLength = 5, periodType = "minute", date) {
  return moment(date).isAfter(moment().subtract(periodLength, periodType))
}
