import { compose, withProps } from "recompose"
import { connect } from "react-redux"

import { WRESTLER_CONFIRM_DELETE } from "../../constants/confirmations"
import { updateWrestler, removeWrestler } from "../../actions/roster"
import EditWrestler from "./wrestler"

const propsMapper = ({ dispatch, id, }) => ({
  onGenderUpdate: male => dispatch(updateWrestler({ male: Boolean(male), id: id, })),
  onBrandSelected: brandId => dispatch(updateWrestler({ brandId: String(brandId), id: id, })),
  onPointsUpdate: e => dispatch(updateWrestler({ points: Number(e.target.value), id: id, })),
  onNameUpdate: e => dispatch(updateWrestler({ name: String(e.target.value), id: id, })),
  onImageUpdate: (name, value) => dispatch(updateWrestler({ image: String(value), id: id, })),
  onDelete: () => {
    if (confirm(WRESTLER_CONFIRM_DELETE)) {
      dispatch(removeWrestler(id))
    }
  },
})

export default compose(
  connect(state => ({
    brands: state.brands,
  })),
  withProps(propsMapper)
)(EditWrestler)
