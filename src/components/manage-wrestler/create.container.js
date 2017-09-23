import { compose, withState, withHandlers, withProps } from "recompose"
import { connect } from "react-redux"

import { createWrestler } from "../../actions/roster"
import EditWrestler from "./wrestler"

const defaultWrestler = {
  id: false,
  brandId: null,
  points: 40,
  name: "Vacant",
  image: "",
}
export default compose(
  connect(state => ({
    brands: state.brands,
  })),
  withState("id", "createWrestler", defaultWrestler.id),
  withState("brandId", "onBrandSelected", defaultWrestler.brandId),
  withState("points", "onPointsUpdate", defaultWrestler.points),
  withState("name", "onNameUpdate", defaultWrestler.name),
  withState("image", "onImageUpdate", defaultWrestler.image),
  withHandlers({
    onBrandSelected: ({ onBrandSelected, }) => brandId => onBrandSelected(String(brandId)),
    onPointsUpdate: ({ onPointsUpdate, }) => e => onPointsUpdate(Number(e.target.value)),
    onNameUpdate: ({ onNameUpdate, }) => e => onNameUpdate(String(e.target.value)),
    onImageUpdate: ({ onImageUpdate, }) => (name, value) => onImageUpdate(String(value)),
    onCreate: props => () => {
      const wrestler = {
        id: defaultWrestler.id,
        name: props.name,
        image: props.image,
        points: props.points,
        brandId: props.brandId,
      }
      props.dispatch(createWrestler(wrestler))

      props.onNameUpdate(defaultWrestler.name)
      props.onPointsUpdate(defaultWrestler.points)
      props.onBrandSelected(defaultWrestler.brandId)
      props.onImageUpdate(defaultWrestler.image)
    },
  }),
  withProps({
    showDelete: false,
  })
)(EditWrestler)
