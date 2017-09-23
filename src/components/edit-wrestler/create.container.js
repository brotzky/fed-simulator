import { compose, withState, withHandlers, withProps } from "recompose"
import { connect } from "react-redux"

import { createWrestler } from "../../actions/roster"
import EditWrestler from "./edit-wrestler"

export default compose(
  connect(
    state => ({
      brands: state.brands,
    }),
    dispatch => ({
      createWrestler: wrestler => dispatch(createWrestler(wrestler)),
    })
  ),
  withState("id", "onCreate", false),
  withState("brandId", "onBrandSelected", null),
  withState("points", "onPointsUpdate", 0),
  withState("name", "onNameUpdate", "Vacant"),
  withState("image", "onImageUpdate", ""),
  withHandlers({
    onBrandSelected: ({ onBrandSelected, }) => brandId => onBrandSelected(String(brandId)),
    onPointsUpdate: ({ onPointsUpdate, }) => e => onPointsUpdate(Number(e.target.value)),
    onNameUpdate: ({ onNameUpdate, }) => e => onNameUpdate(String(e.target.value)),
    onImageUpdate: ({ onImageUpdate, }) => (name, value) => onImageUpdate(String(value)),
    onCreate: props => e => {
      const wrestler = {
        id: false,
        name: props.name,
        image: props.image,
        brandId: props.brandId,
      }
      props.createWrestler(wrestler)
      props.added && props.added()
    },
  }),
  withProps({
    showDelete: false,
  })
)(EditWrestler)
