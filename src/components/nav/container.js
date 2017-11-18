import { compose, withStateHandlers } from "recompose"
import Nav from "./nav"

const toggleSubMenuOpen = ({ isSubMenuOpen, }) => () => {
  console.log(isSubMenuOpen)
  return {
    isSubMenuOpen: !isSubMenuOpen,
  }
}

export default compose(withStateHandlers({ isSubMenuOpen: false, }, { toggleSubMenuOpen, }))(Nav)
