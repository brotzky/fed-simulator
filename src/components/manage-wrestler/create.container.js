import { compose, withState, withHandlers, withProps } from "recompose"
import { connect } from "react-redux"

import { createWrestler } from "../../actions/roster"
import EditWrestler from "./wrestler"

export default compose(
  connect(state => ({
    brands: state.brands,
  })),
  withState("id", "createWrestler", false),
  withState("brandId", "onBrandSelected", null),
  withState("points", "onPointsUpdate", 0),
  withState("name", "onNameUpdate", "Vacant"),
  withState("image", "onImageUpdate", ""),
  withHandlers({
    onBrandSelected: ({ onBrandSelected, }) => brandId => onBrandSelected(String(brandId)),
    onPointsUpdate: ({ onPointsUpdate, }) => e => onPointsUpdate(Number(e.target.value)),
    onNameUpdate: ({ onNameUpdate, }) => e => onNameUpdate(String(e.target.value)),
    onImageUpdate: ({ onImageUpdate, }) => (name, value) => onImageUpdate(String(value)),
    onCreate: props => () => {
      const wrestler = {
        id: false,
        name: props.name,
        image: props.image,
        points: props.points,
        brandId: props.brandId,
      }
      props.dispatch(createWrestler(wrestler))
      props.onNameUpdate("")
      props.onPointsUpdate(0)
      props.onBrandSelected(null)
      props.onImageUpdate("")
    },
  }),
  withProps({
    showDelete: false,
  })
)(EditWrestler)
