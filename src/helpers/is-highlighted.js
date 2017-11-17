import lessThanAPeriodAgo from "./less-than-a-period-ago"

export default function isHighlighted(createdAt) {
  return lessThanAPeriodAgo(7, "minutes", createdAt)
}
