import React from "react"
import { formatCurrency } from "../../helpers/currency"

const Cash = ({ currency = "$", cash = 0, }) => (
  <span className="cash">
    {formatCurrency(currency, cash)}
  </span>
)

export default Cash
